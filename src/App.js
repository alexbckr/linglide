import './App.css';
import React, { Component } from "react";
import Home from './components/Home.js';
import WelcomeModal from './components/WelcomeModal.js';
import SetupModal from './components/SetupModal.js';
import Muted from './images/microphone-alt-slash-solid.svg';
import Unmuted from './images/microphone-alt-solid.svg';

require('typeface-josefin-sans')
require('typeface-inter')

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
      inputText: "This is a cool thing. I'm having fun with my friends. This is neat. I'm going to type more example text.",
      outputText: "Esto es genial. Me estoy divirtiendo con mis amigos. Esto es genial. Voy a escribir más texto de ejemplo.",
      isMuted: false,
      isDM: false,
    };
  }

  modalClosed() {
    var incModals = this.state.modalsShown + 1
    this.setState({
      modalsShown: incModals
    })
  }

  setLanguages(input, output) {
    console.log("setting languages")
    this.setState({
      inputLanguage: input,
      outputLanguage: output
    })
  }

  toggleMute() {
    this.setState({
      isMuted: !this.state.isMuted
    })
  }

  toggleDM() {
    this.setState({
      isDM: !this.state.isDM
    })
    console.log("dm: " + this.state.isDM)
  }

  render() {
    return (
      <div className="App">
        <div className="header">
          <div onClick={() => this.toggleDM()} className="logo header-item">
            <b>Linglide</b>
          </div>
          <div onClick={() => this.toggleMute()}>
            {this.state.isMuted ?
             <img className="slash-spacing mute-unmute header-item" src={Muted} alt="mute/unmute"/>
             : <img className="mute-unmute header-item" src={Unmuted} alt="mute/unmute"/>
            }
          </div>
          <div className="header-item">
            item3
          </div>
        </div>
        <Home inputLanguage={this.state.inputLanguage} outputLanguage={this.state.outputLanguage} inputText={this.state.inputText} outputText={this.state.outputText}/>
        {this.state.modalsShown===0 ? <WelcomeModal modalClosed={this.modalClosed}/> : ""}
        {this.state.modalsShown===1 ? <SetupModal modalClosed={this.modalClosed} setLanguages={this.setLanguages}/> : ""}
      </div>
    );
  }
}

export default App;
