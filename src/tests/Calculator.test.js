import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '../store';
import Calculator from '../components/Calculator/Calculator';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Provider store={store}><Calculator /></Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});
