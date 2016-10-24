import React from 'react';
import ReactDOM from 'react-dom';
import Prospects from './Prospects';
import './index.css';

const api = 'http://localhost:5000';

ReactDOM.render(
  <Prospects api={api} />,
  document.getElementById('root')
);
