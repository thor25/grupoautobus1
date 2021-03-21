import React, { Component } from "react";

import EmptyState from "../EmptyState";
import AdminCard from "../AdminCard"
class AdminPage extends Component {
  render() {
    const { user } = this.props;
    var refresh = false
    console.log("admin",user)
  
    if (user) {

      return (
      <AdminCard user={user}></AdminCard>
      );
    }

    return (
      <EmptyState
        title="Administrador"
        description="Supercharged version of Create React App with all the bells and whistles."
      />
    );
  }
}

export default AdminPage;
