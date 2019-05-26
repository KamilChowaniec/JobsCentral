import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import JobList from '../JobList/JobList';
import LoginRegisterModal from './../LoginRegisterModal/LoginRegisterModal';
import './App.css';

class App extends Component {
  state = {
    searchTags: [],
    searchCity: "",
    modalVisible: false,
    current: 'login'
  }

  handleSearch = (tags, city) => this.setState({ searchTags: tags, searchCity: city });
  handleLoginButton = () => this.setState({ modalVisible: true, current: 'login' });
  handleRegisterButton = () => this.setState({ modalVisible: true, current: 'register' });
  handleModalClose = () => this.setState({ modalVisible: false });
  handleMenuChange = (e) => this.setState({ current: e.key });

  render() {
    return (<>
      <LoginRegisterModal current={this.state.current} visible={this.state.modalVisible} onClose={this.handleModalClose} onMenuChange={this.handleMenuChange} />
      <Navbar onSearch={this.handleSearch} onLogin={this.handleLoginButton} onRegister={this.handleRegisterButton} />
      <div style={{ height: '5px' }}></div>
      <JobList query={{ tags: this.state.searchTags, city: this.state.searchCity }} />;
    </>);

  }
}

export default App;
