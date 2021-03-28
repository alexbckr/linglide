import React from "react";

class WelcomeModal extends React.Component {
  constructor(props) {
    super(props);
    this.paneRef = React.createRef();
  }

  // componentDidMount() {
	// 	this.scrollToBottom();
	// }

  // scrollToBottom = () => {
	// 	this.paneRef.current.scrollTop = this.paneRef.current.scrollHeight;
	// };

  nextClick() {
    console.log("hello world")
    // var modal = document.getElementById("myModal")
    // modal.style.display = "none";
  }

  render() {
    return (
      <div id="myModal" className="welcome-modal">
          <div className="modal-content">
            <div>This is the modal content</div>
            <button onClick={this.nextClick()}>Next</button>
          </div>
      </div>
    );
  }
}

export default WelcomeModal;