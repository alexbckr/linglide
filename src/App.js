import './App.css';
import React, { Component } from "react";
import Home from './components/Home.js';
import WelcomeModal from './components/WelcomeModal.js';
import SetupModal from './components/SetupModal.js';

require('typeface-josefin-sans')
require('typeface-inter')

class App extends Component {
  constructor(props) {
    super(props);
    this.modalClosed = this.modalClosed.bind(this);
    this.state = {
      modalsShown: 0,
      inputLanguage: "",
      outputLanguage: "",
      inputText: "This is a cool thing. I'm having fun with my friends. This is neat. I'm going to type more example text.",
      outputText: "Esto es genial. Me estoy divirtiendo con mis amigos. Esto es genial. Voy a escribir más texto de ejemplo."
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

  render() {
    return (
      <div className="App">
        <div className="header">
          <div className="logo header-item">
            <b>Linglide</b>
          </div>
          <div className="header-item">
            item2
          </div>
          <div className="header-item">
            item3
          </div>
        </div>
        <Home inputLanguage={this.state.inputLanguage} outputLanguage={this.state.outputLanguage} inputText={this.state.inputText} outputText={this.state.outputText}/>
        {this.state.modalsShown===0 ? <WelcomeModal modalClosed={this.modalClosed}/> : ""}
        {this.state.modalsShown===1 ? <SetupModal modalClosed={this.modalClosed} setLanguages={this.setLanguages.bind(this)}/> : ""}
      </div>
    );
  }
}

export default App;
