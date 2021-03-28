import React from "react";
import Pane from "./Pane.js";

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="home">
        <Pane isDM={this.props.isDM} myModalClosed={this.props.modalClosed} className="input-pane" isInput="true" language={this.props.inputLanguage} text={this.props.inputText} />
        <Pane isDM={this.props.isDM} className="output-pane" isInput="false" language={this.props.outputLanguage} text={this.props.outputText}/>
      </div>
    );
  }
}

export default Home;