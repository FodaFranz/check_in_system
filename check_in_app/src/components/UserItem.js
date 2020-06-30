import React, { Component } from 'react';
import propTypes from "prop-types";

class UserItem extends Component {
  state = {
    intervalId: "",
    distance: 0
  }

  constructor(props) {
    super(props);
    this.userContainer = React.createRef();
  }

  componentDidMount() {
    let intervalId = setInterval(this.moveRight, 1000);
    this.setState({ intervalId: intervalId });

    const checkInDateMs = Date.parse(this.props.user.checkIn);
    let initDistance = ((new Date().getTime() - checkInDateMs)/1000);
    this.setState({ distance: initDistance });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  moveRight = () => {
    if(this.state.distance < window.innerWidth - this.userContainer.current.offsetWidth)
      this.setState({ distance: this.state.distance+1 });
  }

  divStyle = (distance) => {
    return {
      marginLeft: distance,
      borderLeft: "solid 2px #bbbfbc",
      padding: 10,
      display: "inline-block"
    }
  }

  render() {
    const { name, checkIn } = this.props.user;

    return (
      <div style={this.divStyle(this.state.distance)} ref={this.userContainer}>
        <p style={checkInStyle}>{"Checkin: " + new Date(Date.parse(checkIn)).toUTCString()}</p>
        {name}
        <button style={buttonStyle} className="btn btn-primary" onClick={this.props.onCheckout.bind(this, name)}>Checkout</button>
      </div>
    );
  }
}

UserItem.propTypes = {
  user: propTypes.object,
  onCheckout: propTypes.func
}

const buttonStyle = {
  marginLeft: 5
}

const checkInStyle = {
  marginBottom: 5,
  color: "#bbbfbc",
  fontSize: 12
}

export default UserItem;