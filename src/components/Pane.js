import React from "react";

class Pane extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="pane">
        <div className="pane-label">
          {this.props.isInput === "true" ? "INPUT" : "OUTPUT"} -{" "}
          {this.props.language}
        </div>
        <div className="text-pane" ref={this.paneRef}>
          {this.props.text}
        </div>
      </div>
    );
  }
}

export default Pane;
