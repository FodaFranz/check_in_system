import React, { Component } from 'react';
import propTypes from "prop-types";

class CheckInForm extends Component {
  state = {
    name: ""
  }

  onCheckin = (e) => {
    e.preventDefault();
    if(this.state.name !== "") {
      this.props.onCheckin(this.state.name);
      this.setState({name: ""});
    }
    else {
      this.props.displayError("Name can't be empty");
    }
  }

  onChange = (e) => this.setState({name: e.target.value});

  render() {
    return (
      <form onSubmit={this.onCheckin} style={formStyle}>
        <input type="text" name="name" placeholder="Name"
          onChange={this.onChange} value={this.state.name} className="form-control"
          style={inputStyle}/>
        <input className="btn btn-primary" type="submit" value="Checkin"
        style={buttonStyle}/>
      </form>
    );
  }
}

CheckInForm.propTypes = {
  onCheckin: propTypes.func,
  displayError: propTypes.func
}

const inputStyle = {
  width: 300
}

const buttonStyle = {
  marginTop: 10,
  marginBottom: 10,
  width: 300
}

const formStyle = {
  borderBottom: "2px solid #bbbfbc",
  marginBottom: 10
}

export default CheckInForm;