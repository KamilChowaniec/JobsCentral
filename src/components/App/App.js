import React, { Component } from "react";
import Navbar from "../Navbar/Navbar";
import JobList from "../JobList/JobList";
import AddJobOfferModal from "../AddJobOfferModal/AddJobOfferModal";
import LoginRegisterModal from "./../LoginRegisterModal/LoginRegisterModal";
import {Modal} from 'antd';
import "./App.css";

function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = decodeURIComponent(
    atob(base64Url)
      .split("")
      .map(function(c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  return JSON.parse(base64);
}

class App extends Component {
  state = {
    searchTags: '',
    searchCity: "",
    modalVisible: false,
    current: "login",
    authLevel: 0,
    showJobModal: false,
    msgModalV: false,
    msg: ''
  };

  componentDidMount() {
    if (localStorage.getItem("token")) {
      let i = parseJwt(localStorage.getItem("token"));
      if (i.id==0) this.setState({ authLevel: 2 });
      else this.setState({ authLevel: 1 });
    }
  }

  handleSearch = (tags, city) =>
    this.setState({ searchTags: tags, searchCity: city });
  handleLoginButton = () =>
    this.setState({ modalVisible: true, current: "login" });
  handleRegisterButton = () =>
    this.setState({ modalVisible: true, current: "register" });
  handleModalClose = () => this.setState({ modalVisible: false });
  handleMenuChange = e => this.setState({ current: e.key });
  handleLogin = (authLevel) => this.setState({ authLevel, modalVisible:false  });
  handleRegister = (status) => {

    this.setState({ modalVisible: false, msgModalV: true, msg: status ? "Rejestracja powiodła się, możesz się teraz zalogować!" : "Rejestracja nie powiodła się!" }

    )
  };
  handleLogout = () => {
    this.setState({ authLevel: 0 });
    localStorage.removeItem("token");
  };
  handleHideJobModal = () => {
    this.setState({ showJobModal: false });
  };
  handleShowJobModal = () => {
    this.setState({ showJobModal: true });
  };

  handleMsgModalClose = () => this.setState({ msgModalV: false });

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
        <AddJobOfferModal
          visible={this.state.showJobModal}
          onHide={this.handleHideJobModal}
        />
        <Navbar
          onSearch={this.handleSearch}
          onLogin={this.handleLoginButton}
          onRegister={this.handleRegisterButton}
          onLogout={this.handleLogout}
          authed={this.state.authLevel}
          onShowJobModal={this.handleShowJobModal}
        />
        <div style={{ height: "5px" }} />
        <JobList
          query={{ tags: this.state.searchTags, city: this.state.searchCity }}
          authed={this.state.authLevel}
        />
        <Modal
          visible={this.state.msgModalV}
          onCancel={this.handleMsgModalClose}
          onOk={this.handleMsgModalClose}
          maskClosable={true}
          zIndex={1000}
        >
          {this.state.msg}

        </Modal>
      </>
    );
  }
}

export default App;
