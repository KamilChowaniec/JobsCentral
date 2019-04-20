import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import './App.css';

class App extends Component {
  state = {
    searchTags: [],
    searchCity: ""
  }

  handleSearch = (tags, city) => {
    console.log(tags);
    console.log(city)
  }

  render() {
    return (<>
      <Navbar onSearch={this.handleSearch} />
    </>);

  }
}

export default App;
