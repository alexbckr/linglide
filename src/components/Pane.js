import React from "react";
import langs from "../utils/langs";
import { ReactComponent as SpeakPrompt } from "../images/comments-regular.svg";
import { ReactComponent as RightPrompt } from "../images/language-solid.svg";



class Pane extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        className={this.props.isInput === "true" ? "input-pane pane" : "pane"}
      >
        <div className={(this.props.isDM ? "pane-labelDM " : "") + "pane-label"}>
          {this.props.isInput === "true" ? "INPUT" : "OUTPUT"}

          <div className={(this.props.isDM ? "language-labelDM " : "") + "language-label"}>{langs[this.props.language]}</div>
        </div>
        <div className={(this.props.text === "" ? "pane-empty " : "") + (this.props.isDM ? "text-paneDM " : "") + "text-pane"}>
          {(this.props.isInput === "true" ? (this.props.text === "" ? <SpeakPrompt className={(this.props.isDM ? "speaker-promptDM " : "") + "speaker-prompt"}/> : this.props.text) : "")}
          {(this.props.isInput === "true" ? (this.props.text === "" ? <div style={this.props.isDM ? {"color": "white"} : {"color": "#363636"}} className="speaker-prompt-text"><span className="green-underline">Begin speaking</span> to activate our translator. Your words will appear here.</div> : "") : "")}
          {(this.props.isInput === "false" ? (this.props.text === "" ? <RightPrompt className={(this.props.isDM ? "speaker-promptDM " : "") + "speaker-prompt"}/> : this.props.text) : "")}
          {(this.props.isInput === "false" ? (this.props.text === "" ? <div style={this.props.isDM ? {"color": "white"} : {"color": "#363636"}} className="speaker-prompt-text">Once you start speaking, <span className="green-underline">we'll translate your words here</span>, and play the audio.</div> : "") : "")}
        </div>
      </div>
    );
  }
}

export default Pane;
