import React, { Component } from "react";

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({
      file: URL.createObjectURL(event.target.files[0]),
    });
  }
  render() {
    return (
      <div>
        <img src={this.state.file} id="uploaded-img" alt="error" />
        <div className="button-wrap">
          <label className="new-button" htmlFor="upload">
            {" "}
            Upload MEME
          </label>
        </div>
        <input id="upload" type="file" onChange={this.handleChange} />
      </div>
    );
  }
}
export default Upload;
