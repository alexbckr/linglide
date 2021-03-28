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
          Hello, my name is Alex... Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Nulla vestibulum nisi id suscipit rutrum. Mauris
          venenatis elementum mi nec volutpat. Aenean elit justo, fermentum a
          diam ut, sollicitudin gravida lectus. Maecenas vel tellus fermentum,
          pulvinar ligula sit amet, rutrum lacus. Ut finibus dui sed leo aliquet
          consectetur. Donec a lorem ut felis malesuada elementum porta vel est.
          Proin eget arcu leo. Proin non sem pellentesque, varius libero et,
          auctor arcu. Mauris ut enim finibus, mattis ipsum vitae, scelerisque
          libero. Fusce at dui diam. Vestibulum eget molestie eros. Aliquam at
          erat porttitor, congue ex nec, ultricies elit. Aliquam pellentesque
          euismod ligula, ut vestibulum magna commodo eget. Donec aliquet
          facilisis dolor, et consectetur eros. Praesent commodo mattis blandit.
          Quisque nec nunc tortor. Vestibulum sollicitudin malesuada metus, quis
          dapibus odio posuere ullamcorper. Praesent vestibulum pellentesque
          lorem eget dictum. Nunc pharetra nisl vel neque molestie, quis semper
          tortor vehicula. Sed auctor vestibulum leo at ullamcorper. Nullam
          euismod gravida massa eu bibendum. Nam dapibus ante vel tortor
          tincidunt, vel pharetra odio porta. Integer at augue bibendum, cursus
          purus a, facilisis nunc. Maecenas nulla felis, sollicitudin in lacus
          non, imperdiet varius ipsum. Suspendisse aliquam velit volutpat tempor
          venenatis. Vestibulum ut lorem scelerisque, tristique lectus a,
          iaculis.
        </div>
      </div>
    );
  }
}

export default Pane;
