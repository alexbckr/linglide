import React from "react";

class SetupModal extends React.Component {
  constructor(props) {
    super(props);
    this.paneRef = React.createRef();
    this.doneClicked = this.doneClicked.bind(this);
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
          <div className="modal-content">
            <div>This is the second modal</div>
            <select id="input-language-dropdown">
                <option value="English">English</option>
                <option value="Mandarin">Mandarin</option>
                <option value="Spanish">Spanish</option>
                <option value="German">German</option>
            </select>
            <select id="output-language-dropdown">
                <option value="English">English</option>
                <option value="Mandarin">Mandarin</option>
                <option value="Spanish">Spanish</option>
                <option value="German">German</option>
            </select>

            <button onClick={this.doneClicked}>
                Done
            </button>
          </div>
      </div>
    );
  }
}

export default SetupModal;