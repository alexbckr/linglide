import React from "react";
import Select from 'react-select';

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
  }

//   closeModal() {
//     var modal = document.getElementById("myModal")
//     modal.style.display = "none";
//   }

  doneClicked() {
    console.log("done clicked")
    this.props.modalClosed()
    var inputLanguage = document.getElementById("input-language-dropdown").value
    var outputLanguage = document.getElementById("output-language-dropdown").value
    this.props.setLanguages(inputLanguage, outputLanguage)
      
  }

  render() {
    return (
      <div id="myModal" className="setup-modal">
          <div className="setup-modal-content modal-content">
            <div className="setup-prompt">Select an "input" language and an "output" language.</div>
            <div className="setup-subtitle">We'll translate the language you're speaking into the output language.</div>
            <div className="lang-select-container"> 
              {/* <Select defaultValue={this.lang_options[0]} options={this.lang_options}/> */}
              <div>
                Input
              <select className="lang-select" id="input-language-dropdown">
                  <option value="English">English</option>
                  <option value="Mandarin">Mandarin</option>
                  <option value="Spanish">Spanish</option>
                  <option value="German">German</option>
              </select>
              </div>
              <div>
                Output
              <select className="lang-select" id="output-language-dropdown">
                  <option value="English">English</option>
                  <option value="Mandarin">Mandarin</option>
                  <option value="Spanish">Spanish</option>
                  <option value="German">German</option>
              </select>
              </div>
            </div> 

            <button className="onboarding-button" onClick={this.doneClicked}>
                Done
            </button>
          </div>
      </div>
    );
  }
}

export default SetupModal;