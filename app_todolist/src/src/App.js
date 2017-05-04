import React, { Component } from 'react';
import './common/normalize.scss';
import './App.scss';
import Root from './page/root/root';
import {Provider} from 'react-redux';

class App extends Component {
  render() {
    return (
      <Root/>
    );
  }
}

export default App;
