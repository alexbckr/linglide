import React from "react";
import Select from 'react-select';
import langs from "../utils/langs";

class SetupModal extends React.Component {
  constructor(props) {
    super(props);
    this.doneClicked = this.doneClicked.bind(this);
    this.lang_options = [
      { value: 'eng', label: 'English' },
      { value: 'span', label: 'Spanish' },
      { value: 'Rus', label: 'Russian' }
    ]
    // this.closeModal = this.closeModal.bind(this);
    this.state = {
      inputLang: "en-US",
      outputLang: "en-US",
    };
  }

  //   closeModal() {
  //     var modal = document.getElementById("myModal")
  //     modal.style.display = "none";
  //   }

  doneClicked() {
    console.log("done clicked");
    this.props.setLanguages(this.state.inputLang, this.state.outputLang);
    this.props.modalClosed();
  }

  updateInput(e) {
    this.setState({ inputLang: e.target.value });
  }
  updateOutput(e) {
    this.setState({ outputLang: e.target.value });
  }

  render() {
    const dropdown = Object.keys(langs).map((key) => (
      <option key={key} value={key}>
        {langs[key]}
      </option>
    ));
    return (
      <div id="myModal" className="setup-modal">
          <div className="setup-modal-content modal-content">
            <div className="setup-prompt">Select an "input" language and an "output" language.</div>
            <div className="setup-subtitle">We'll translate the language you're speaking into the output language.</div>

              <div className="first-lang-pair lang-pair">
                Input{" "}
                <select
                  id="input-language-dropdown"
                  className="input-ls lang-select"
                  onChange={this.updateInput.bind(this)}
                  value={this.state.inputLang}
                >
                {dropdown}
                </select>
              </div>
              <div className="second-lang-pair lang-pair">
                Output{" "}
                <select
                  id="output-language-dropdown"
                  className="output-ls lang-select"
                  onChange={this.updateOutput.bind(this)}
                  value={this.state.outputLang}
                >
                {dropdown}
                  </select>
              </div>

            <button className="done-button onboarding-button" onClick={this.doneClicked}>
                Done
            </button>
          </div>
      </div>
    );
  }
}

export default SetupModal;
