import React from "react";
import langs from "../utils/langs";

class SetupModal extends React.Component {
  constructor(props) {
    super(props);
    this.paneRef = React.createRef();
    this.doneClicked = this.doneClicked.bind(this);
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
          <div className="setup-prompt">
            Select an "input" language and an "output" language.
          </div>
          <div className="setup-subtitle">
            We'll translate the lanaguage you're speaking into the output
            language
          </div>
          <select
            id="input-language-dropdown"
            onChange={this.updateInput.bind(this)}
            value={this.state.inputLang}
          >
            {dropdown}
          </select>
          <select
            id="output-language-dropdown"
            onChange={this.updateOutput.bind(this)}
            value={this.state.outputLang}
          >
            {dropdown}
          </select>

          <button onClick={this.doneClicked}>Done</button>
        </div>
      </div>
    );
  }
}

export default SetupModal;
