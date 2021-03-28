import React from "react";
import Pane from "./Pane.js";

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="home">
        <Pane className="input-pane" isInput="true" language="English" />
        <Pane className="output-pane" isInput="false" language="Mandarin"/>
      </div>
    );
  }
}

export default Home;