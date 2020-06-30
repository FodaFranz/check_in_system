import React, { Component } from 'react';
import propTypes from "prop-types";
import UserItem from "./UserItem";

class UserList extends Component {
  render() {
    return this.props.users.map((user) => (
      <div style={divStyle}>
        <UserItem key={user._id} user={user} onCheckout={this.props.onCheckout} />
      </div>
    ));
  }
}

UserList.propTypes = {
  users: propTypes.array.isRequired,
  onCheckout: propTypes.func
}

const divStyle = {
  marginBottom: 5
}

export default UserList;