import React from "react";

class WelcomeModal extends React.Component {
  constructor(props) {
    super(props);
    // this.closeModal = this.closeModal.bind(this);
  }

//   closeModal() {
//     var modal = document.getElementById("myModal")
//     modal.style.display = "none";
//   }

  render() {
    return (
      <div id="myModal" className="modal">
          <div className="modal-content">
            <div className="welcome-text">Hey 👋, welcome to Linglide</div>
            <div className="value-prop">We seamlessly translate your speech to any language in real time.</div>
            {/*<div>Set us as your Zoom output so your partner can understand your speech</div> */}
            <button className="onboarding-button" onClick={this.props.modalClosed}>
                Set up Linglide
            </button>
          </div>
      </div>
    );
  }
}

export default WelcomeModal;