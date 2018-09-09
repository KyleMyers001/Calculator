import React, { Component } from 'react';
import { Provider } from 'react-redux';
import './App.css';
import Calculator from '../../components/Calculator/Calculator';
import store from '../../store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="app">
          <Calculator />
        </div>
      </Provider>
    );
  }
}

export default App;
