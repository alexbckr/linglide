import React from "react";
import langs from "../utils/langs";

class Pane extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        className={this.props.isInput === "true" ? "input-pane pane" : "pane"}
      >
        <div className="pane-label">
          {this.props.isInput === "true" ? "INPUT" : "OUTPUT"}

          <div className="language-label">{langs[this.props.language]}</div>
        </div>
        <div className="text-pane" ref={this.paneRef}>
          {this.props.text}
        </div>
      </div>
    );
  }
}

export default Pane;
