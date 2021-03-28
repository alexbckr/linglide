import './App.css';
import React, { Component } from "react";
import Home from './components/Home.js';
import WelcomeModal from './components/WelcomeModal.js';
import SetupModal from './components/SetupModal.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.modalClosed = this.modalClosed.bind(this);
    this.state = {
      modalsShown: 0,
      inputLanguage: "",
      outputLanguage: "",
      inputText: "fuck",
      outputText: "me"
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
        <Home inputLanguage={this.state.inputLanguage} outputLanguage={this.state.outputLanguage} inputText={this.state.inputText} outputText={this.state.outputText}/>
        {this.state.modalsShown===0 ? <WelcomeModal modalClosed={this.modalClosed}/> : ""}
        {this.state.modalsShown===1 ? <SetupModal modalClosed={this.modalClosed} setLanguages={this.setLanguages.bind(this)}/> : ""}
      </div>
    );
  }
}

export default App;
