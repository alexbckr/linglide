import React from "react";

class Pane extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={(this.props.isInput === "true") ? "input-pane pane" : "pane"}>
        <div className={(this.props.isDM ? "pane-labelDM " : "") + "pane-label"}>
          {this.props.isInput === "true" ? "INPUT" : "OUTPUT"}
          
          <div className={(this.props.isDM ? "language-labelDM " : "") + "language-label"}>{this.props.language}</div>
        </div>
        <div className={(this.props.isDM ? "text-paneDM " : "") + "text-pane"}>
          {this.props.text}
        </div>
      </div>
    );
  }
}

export default Pane;
