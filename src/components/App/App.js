import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import JobList from '../JobList/JobList';
import './App.css';

class App extends Component {
  state = {
    searchTags: [],
    searchCity: ""
  }

  handleSearch = (tags, city) => this.setState({ searchTags: tags, searchCity: city });
  handleLogin = () => { };
  handleRegister = () => { };

  render() {
    return (<>
      <Navbar onSearch={this.handleSearch} onLogin={this.handleLogin} onRegister={this.handleRegister} />
      <div style={{height:'5px'}}></div>
      <JobList query={{ tags: this.state.searchTags, city: this.state.searchCity }} />;
    </>);

  }
}

export default App;
