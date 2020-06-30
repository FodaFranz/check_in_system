import React from 'react';
import axios from "axios";
import UserList from "./components/UserList";
import CheckInForm from "./components/CheckInForm";
import './App.css';

class App extends React.Component {
  state = {
    users: [],
    errMsg: ""
  }

  componentDidMount() {
    axios.get("http://localhost:8080/api/checkins")
      .then(res => {
        this.setState({ users: res.data });
      })
      .catch(err => this.setState({ errMsg: err.response.data }))
  }

  onCheckin = name => {
    this.setState({ errMsg: "" });
    axios.post(`http://localhost:8080/api/checkin?name=${name}`)
      .then(res => {
          this.setState({ users: [...this.state.users, res.data]});
      })
      .catch(err => this.setState({ errMsg: err.response.data }))

  }

  onCheckout = name => {
    axios.post(`http://localhost:8080/api/checkout?name=${name}`)
      .then(res => {
        console.log(`${name} has been checked in for ${res.data/60} min`);
        this.setState({ users: [...this.state.users.filter(user => user.name !== name)]});
      })
      .catch(err => this.setState({ errMsg: err.response.data }))
  }

  displayError = error => this.setState({ errMsg: error });

  render() {
    return (
      <div style={{padding: 10}}>
        <CheckInForm onCheckin={this.onCheckin} displayError={this.displayError}></CheckInForm>
        <p style={errorStyle}>{this.state.errMsg}</p>
        <UserList onCheckout={this.onCheckout} users={this.state.users}></UserList>
      </div>
    );
  }
}

const errorStyle = {
  color: "#ff0000"
}

export default App;
