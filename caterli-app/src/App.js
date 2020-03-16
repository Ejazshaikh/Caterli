import React, { PureComponent } from 'react';
import { Provider } from 'react-redux';
import './App.css';
import store from './store';
import CaterliApp from './CaterliApp';

export default class App extends PureComponent {
  render() {
    return (
      <Provider store={store}>
        <CaterliApp />
      </Provider>
    );
  }
}
