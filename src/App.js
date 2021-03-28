import "./App.css";
import React, { Component } from "react";
import Home from "./components/Home.js";
import WelcomeModal from "./components/WelcomeModal.js";
import SetupModal from "./components/SetupModal.js";
import Muted from "./images/microphone-alt-slash-solid.svg";
import Unmuted from "./images/microphone-alt-solid.svg";
var io = require("socket.io-client");
var ss = require("socket.io-stream");
var RecordRTC = require("recordrtc");

require("typeface-josefin-sans");
require("typeface-inter");

const soundDelay = 4000;
const vidDelay = 1000;

const socketio1 = io(); // for the node server
const socketio2 = io(); // for the python server
const socket1 = socketio1.on("connect", function () {
  console.log("socket1");
});
// const socket2 = socketio2.on("connect", function () {
//   console.log("socket2");
// });

class App extends Component {
  constructor(props) {
    super(props);
    this.modalClosed = this.modalClosed.bind(this);
    this.setLanguages = this.setLanguages.bind(this);
    this.toggleMute = this.toggleMute.bind(this);
    this.state = {
      modalsShown: 0,
      inputLanguage: "",
      outputLanguage: "",
      inputText:
        "This is a cool thing. I'm having fun with my friends. This is neat. I'm going to type more example text.",
      outputText:
        "Esto es genial. Me estoy divirtiendo con mis amigos. Esto es genial. Voy a escribir más texto de ejemplo.",
      isMuted: false,
      isDM: false,
      initialized: false,
    };
    this.recordAudio = null;
  }

  componentDidMount() {
    socketio1.on("readytogo", this.readyToGo.bind(this));
  }

  readyToGo(data) {
    console.log(data);
    this.setState({ initialized: true });

    socketio1.on("translate-results", this.receiveTranslateResults.bind(this));

    socketio1.on("tts-results", this.receiveTtsResults.bind(this));

    this.startRecording();
  }

  receiveTranslateResults(data) {
    console.log(data);
    if (data) {
      this.setState({
        outputText:
          this.state.outputText + "" + data.textTranslationResult.translation,
      });
      ss(socket1).emit("tts", data.textTranslationResult.translation, {});
    }
  }

  receiveTtsResults(data) {
    console.log(data);
    this.playOutput(data);
  }

  // Recording functions
  recordAudioRTC(stream) {
    this.recordAudio = RecordRTC(stream, {
      type: "audio",
      mimeType: "audio/webm",
      sampleRate: 44100,
      desiredSampRate: 16000,

      recorderType: RecordRTC.StereoAudioRecorder,
      numberOfAudioChannels: 1,

      //1)
      // get intervals based blobs
      // value in milliseconds
      // as you might not want to make detect calls every seconds
      timeSlice: soundDelay,

      //2)
      // as soon as the stream is available
      ondataavailable: function (blob) {
        console.log("here");
        // 3
        // making use of socket.io-stream for bi-directional
        // streaming, create a stream
        var stream = ss.createStream();
        // stream directly to server
        // it will be temp. stored locally
        ss(socket1).emit("stream-media", stream, {
          name: "stream.wav",
          size: blob.size,
        });
        // pipe the audio blob to the read stream
        ss.createBlobReadStream(blob).pipe(stream);
      },
    });

    this.recordAudio.startRecording();
    console.log("start!");
  }
  startRecording() {
    // disable button
    if (!this.state.initialized) return;
    navigator.getUserMedia(
      {
        audio: true,
      },
      this.recordAudioRTC.bind(this),
      function (error) {
        console.error(JSON.stringify(error));
      }
    );
  }
  stopRecording() {
    if (!this.state.initialized) return;
    this.recordAudio.stopRecording();
  }
  playOutput(arrayBuffer) {
    let audioContext = new AudioContext();
    let outputSource;
    try {
      if (arrayBuffer.byteLength > 0) {
        console.log(arrayBuffer.byteLength);
        audioContext.decodeAudioData(
          arrayBuffer,
          function (buffer) {
            audioContext.resume();
            outputSource = audioContext.createBufferSource();
            outputSource.connect(audioContext.destination);
            outputSource.buffer = buffer;
            outputSource.start(0);
          },
          function () {
            console.log(arguments);
          }
        );
      }
    } catch (e) {
      console.log(e);
    }
  }
  // other
  modalClosed() {
    var incModals = this.state.modalsShown + 1;
    this.setState({
      modalsShown: incModals,
    });
  }

  setLanguages(input, output) {
    console.log("setting languages", input, output);
    this.setState({
      inputLanguage: input,
      outputLanguage: output,
    });
    socket1.emit("setlanguage", {
      source: input,
      target: output,
    });
  }

  toggleMute() {
    if (this.state.isMuted) {
      this.startRecording();
    } else {
      this.stopRecording();
    }
    this.setState({
      isMuted: !this.state.isMuted,
    });
  }

  toggleDM() {
    this.setState({
      isDM: !this.state.isDM,
    });
    console.log("dm: " + this.state.isDM);
  }

  render() {
    return (
      <div className="App">
        <div className="header">
          <div onClick={() => this.toggleDM()} className="logo header-item">
            <b>Linglide</b>
          </div>
          <div onClick={() => this.toggleMute()}>
            {this.state.isMuted ? (
              <img
                className="slash-spacing mute-unmute header-item"
                src={Muted}
                alt="mute/unmute"
              />
            ) : (
              <img
                className="mute-unmute header-item"
                src={Unmuted}
                alt="mute/unmute"
              />
            )}
          </div>
          <div className="header-item">item3</div>
        </div>
        <Home
          inputLanguage={this.state.inputLanguage}
          outputLanguage={this.state.outputLanguage}
          inputText={this.state.inputText}
          outputText={this.state.outputText}
        />
        {this.state.modalsShown === 0 ? (
          <WelcomeModal modalClosed={this.modalClosed} />
        ) : (
          ""
        )}
        {this.state.modalsShown === 1 ? (
          <SetupModal
            modalClosed={this.modalClosed}
            setLanguages={this.setLanguages}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default App;
