/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */

// ------------- SETTINGS
const projectId = "the-slate-309023"; //process.env.npm_config_PROJECT_ID;
const example = 8; //process.env.npm_config_EXAMPLE;
const port = process.env.npm_config_PORT || 8080;

const languageCode = "en-US";
let encoding = "LINEAR16";

// console.log(example);
// if (example == 7) {
// NOTE: ENCODING NAMING FOR SPEECH API IS DIFFERENT
// let encoding = "linear16";
// }`

const singleUtterance = true;
const interimResults = false;
const sampleRateHertz = 16000;
const speechContexts = [
  {
    phrases: ["mail", "email"],
    boost: 20.0,
  },
];

console.log(example);
console.log(projectId);

// ----------------------

// load all the libraries for the server
const socketIo = require("socket.io");
const path = require("path");
const fs = require("fs");
const http = require("http");
const cors = require("cors");
const express = require("express");
const ss = require("socket.io-stream");
// load all the libraries for the Dialogflow part
const uuid = require("uuid");
const util = require("util");
const { Transform, pipeline } = require("stream");
const pump = util.promisify(pipeline);

// set some server variables
const app = express();
var server;
var sessionId, sessionClient, sessionPath, request;
var speechClient,
  requestSTT,
  ttsClient,
  requestTTS,
  mediaTranslationClient,
  requestMedia;

// STT demo
const speech = require("@google-cloud/speech");

// TTS demo
const textToSpeech = require("@google-cloud/text-to-speech");

// Media Translation Demo
const mediatranslation = require("@google-cloud/media-translation");

/**
 * Setup Express Server with CORS and SocketIO
 */
function setupServer() {
  // setup Express
  app.use(cors({ origin: "*" }));
  app.get("/", function (req, res) {
    console.log("test");
    res.sendFile(path.join(__dirname + "/example" + example + ".html"));
  });
  server = http.createServer(app);
  io = socketIo(server, {
    cors: {
      origin: "*",
    },
  });
  server.listen(port, () => {
    console.log("Running server on port %s", port);
  });

  // Listener, once the client connect to the server socket
  io.on("connect", (client) => {
    console.log(`Client connected [id=${client.id}]`);
    client.emit("server_setup", `Server connected [id=${client.id}]`);

    // when the client sends 'message' events
    // when using simple audio input
    client.on("message", async function (data) {
      // we get the dataURL which was sent from the client
      const dataURL = data.audio.dataURL.split(",").pop();
      // we will convert it to a Buffer
      let fileBuffer = Buffer.from(dataURL, "base64");
      // run the simple detectIntent() function
      const results = await detectIntent(fileBuffer);
      client.emit("results", results);
    });

    // when the client sends 'message' events
    // when using simple audio input
    client.on("message-transcribe", async function (data) {
      // we get the dataURL which was sent from the client
      const dataURL = data.audio.dataURL.split(",").pop();
      // we will convert it to a Buffer
      let fileBuffer = Buffer.from(dataURL, "base64");
      // run the simple transcribeAudio() function
      const results = await transcribeAudio(fileBuffer);
      client.emit("results", results);
    });

    client.on("setlanguage", function (data) {
      console.log(data);
      const { source, target } = data;
      setupSTT(source);
      setupTTS(target);
      mediaTranslation(source, target);
      console.log("lang", source, target);
      client.emit("readytogo", true);
    });

    // when the client sends 'stream' events
    // when using audio streaming
    ss(client).on("stream", function (stream, data) {
      // get the name of the stream
      const filename = path.basename(data.name);
      // pipe the filename to the stream
      stream.pipe(fs.createWriteStream(filename));
      // make a detectIntStream call
      detectIntentStream(stream, function (results) {
        console.log(results);
        client.emit("results", results);
      });
    });

    // when the client sends 'stream-transcribe' events
    // when using audio streaming
    ss(client).on("stream-transcribe", function (stream, data) {
      // get the name of the stream
      const filename = path.basename(data.name);
      // pipe the filename to the stream
      stream.pipe(fs.createWriteStream(filename));
      // make a detectIntStream call
      transcribeAudioStream(stream, function (results) {
        console.log(results);
        client.emit("transcribe-results", results);
      });
    });

    // when the client sends 'tts' events
    ss(client).on("tts", function (text) {
      textToAudioBuffer(text)
        .then(function (results) {
          // console.log(results);
          client.emit("tts-results", results);
        })
        .catch(function (e) {
          console.log(e);
        });
    });

    // when the client sends 'stream-media' events
    // when using audio streaming
    ss(client).on("stream-media", function (stream, data) {
      // get the name of the stream
      const filename = path.basename(data.name);
      // pipe the filename to the stream
      stream.pipe(fs.createWriteStream(filename));
      // make a detectIntStream call
      transcribeAudioMediaStream(stream, function (results) {
        // console.log(results);
        client.emit("translate-results", results);
      });
    });
  });
}

/**
 * Setup Cloud STT Integration
 */
function setupSTT(source) {
  // Creates a client
  speechClient = new speech.SpeechClient();

  // Create the initial request object
  // When streaming, this is the first call you will
  // make, a request without the audio stream
  // which prepares Dialogflow in receiving audio
  // with a certain sampleRateHerz, encoding and languageCode
  // this needs to be in line with the audio settings
  // that are set in the client
  requestSTT = {
    config: {
      sampleRateHertz: sampleRateHertz,
      encoding: "LINEAR16",
      languageCode: source,
    },
    interimResults: interimResults,
    //enableSpeakerDiarization: true,
    //diarizationSpeakerCount: 2,
    //model: `phone_call`
  };
}

/*
 * Setup Media Translation
 */
function mediaTranslation(source, target) {
  mediaTranslationClient = new mediatranslation.SpeechTranslationServiceClient();

  // Create the initial request object
  // console.log(encoding);
  requestMedia = {
    audioEncoding: "linear16",
    sourceLanguageCode: source,
    targetLanguageCode: target,
  };
}

/**
 * Setup Cloud STT Integration
 */
function setupTTS(target) {
  // Creates a client
  ttsClient = new textToSpeech.TextToSpeechClient();

  // Construct the request
  requestTTS = {
    // Select the language and SSML Voice Gender (optional)
    voice: {
      languageCode: target, //https://www.rfc-editor.org/rfc/bcp/bcp47.txt
      ssmlGender: "NEUTRAL", //  'MALE|FEMALE|NEUTRAL'
    },
    // Select the type of audio encoding
    audioConfig: {
      audioEncoding: "LINEAR16", //'LINEAR16|MP3|AUDIO_ENCODING_UNSPECIFIED/OGG_OPUS'
    },
  };
}

/*
 * STT - Transcribe Speech
 * @param audio file buffer
 */
async function transcribeAudio(audio) {
  requestSTT.audio = {
    content: audio,
  };
  console.log(requestSTT);
  const responses = await speechClient.recognize(requestSTT);
  return responses;
}

/*
 * Media Translation Stream
 * @param audio stream
 * @param cb Callback function to execute with results
 */
async function transcribeAudioMediaStream(audio, cb) {
  var isFirst = true;

  const initialRequest = {
    streamingConfig: {
      audioConfig: requestMedia,
      audioContent: null,
    },
  };

  audio.on("data", (chunk) => {
    if (isFirst) {
      // console.log("one time");
      stream.write(initialRequest);
      isFirst = false;
      // console.log(initialRequest);
    }
    console.log("other times");
    const request = {
      streamingConfig: {
        audioConfig: requestMedia,
      },
      audioContent: chunk.toString("base64"),
    };
    // console.log(request);
    //console.log(request);
    stream.write(request);
  });

  const stream = mediaTranslationClient
    .streamingTranslateSpeech()
    .on("data", function (response) {
      // console.log("results");
      // console.log(response);
      // when data comes in
      // log the intermediate transcripts
      const { result } = response;
      if (result.textTranslationResult.isFinal) {
        // console.log(
        //   `\nFinal translation: ${result.textTranslationResult.translation}`
        // );
        // console.log(`Final recognition result: ${result.recognitionResult}`);
        cb(result);
      } else {
        /*console.log(
        `\nPartial translation: ${result.textTranslationResult.translation}`
      );
      console.log(
        `Partial recognition result: ${result.recognitionResult}`
      );*/
      }
    })
    .on("error", (e) => {
      //console.log(e);
    })
    .on("end", () => {
      console.log("on end");
    });
}

/*
 * STT - Transcribe Speech on Audio Stream
 * @param audio stream
 * @param cb Callback function to execute with results
 */
async function transcribeAudioStream(audio, cb) {
  const recognizeStream = speechClient
    .streamingRecognize(requestSTT)
    .on("data", function (data) {
      console.log(data);
      cb(data);
    })
    .on("error", (e) => {
      console.log(e);
    })
    .on("end", () => {
      console.log("on end");
    });

  audio.pipe(recognizeStream);
  audio.on("end", function () {
    //fileWriter.end();
  });
}

/*
 * TTS text to an audio buffer
 * @param text - string written text
 */
async function textToAudioBuffer(text) {
  console.log(text);
  requestTTS.input = { text: text }; // text or SSML
  // Performs the Text-to-Speech request
  const response = await ttsClient.synthesizeSpeech(requestTTS);
  return response[0].audioContent;
}

// setupSTT();
// setupTTS();
// mediaTranslation();

setupServer();
