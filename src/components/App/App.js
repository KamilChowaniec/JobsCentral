import React, { Component } from "react";
import Navbar from "../Navbar/Navbar";
import JobList from "../JobList/JobList";
import LoginRegisterModal from "./../LoginRegisterModal/LoginRegisterModal";
import "./App.css";

class App extends Component {
  state = {
    searchTags: [],
    searchCity: "",
    modalVisible: false,
    current: "login",
    authLevel: 0
  };
  componentDidMount() {
    if (localStorage.getItem("token")) this.setState({ authLevel: 1 });
  }

  handleSearch = (tags, city) =>
    this.setState({ searchTags: tags, searchCity: city });
  handleLoginButton = () =>
    this.setState({ modalVisible: true, current: "login" });
  handleRegisterButton = () =>
    this.setState({ modalVisible: true, current: "register" });
  handleModalClose = () => this.setState({ modalVisible: false });
  handleMenuChange = e => this.setState({ current: e.key });
  handleLogin = authLevel => this.setState({ authLevel });
  handleRegister = () => {};
  handleLogout = () => {
    this.setState({ authLevel: 0 });
    localStorage.removeItem("token");
  };

  render() {
    return (
      <>
        <LoginRegisterModal
          current={this.state.current}
          visible={this.state.modalVisible}
          onClose={this.handleModalClose}
          onMenuChange={this.handleMenuChange}
          onLogin={this.handleLogin}
          onRegister={this.handleRegister}
        />
        <Navbar
          onSearch={this.handleSearch}
          onLogin={this.handleLoginButton}
          onRegister={this.handleRegisterButton}
          onLogout={this.handleLogout}
          authed={this.state.authLevel}
        />
        <div style={{ height: "5px" }} />
        <JobList
          query={{ tags: this.state.searchTags, city: this.state.searchCity }}
          authed={this.state.authLevel}
        />
        ;
      </>
    );
  }
}

export default App;
