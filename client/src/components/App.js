import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Main from './Main/Main';

// import Splash from '';

class App extends Component {
  render() {
    return (
      <div className="reset">
        <BrowserRouter>
          <Route path="/" component={Main} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
