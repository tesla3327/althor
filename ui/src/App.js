import React, { Component } from 'react';
import './App.css';

const api = 'http://localhost:5000/screenshot/';

const Screenshot = ({ host, mobile }) => (
  <img
    className="screenshot"
    src={ `${api}${ mobile ? 'mobile' : 'desktop' }/${host}` }
    role="presentation"
  />
);

const Insights = ({ mobile, desktop }) => (
  <div className="insights">
    <div className="mobile">
      <h2>Mobile</h2>
      <p>
        <span><strong>Speed:</strong></span>
        <span>{ mobile.speed }</span>
      </p>
      <p>
        <span><strong>Usability:</strong></span>
        <span>{ mobile.usability }</span>
      </p>
    </div>
    <div className="desktop">
      <h2>Desktop</h2>
      <p>
        <span><strong>Speed:</strong></span>
        <span>{ desktop.speed }</span>
      </p>
      <p>
        <span><strong>Usability:</strong></span>
        <span>{ desktop.usability }</span>
      </p>
    </div>
    <div className="ratio">
      <h2>Ratio</h2>
      <p>
        <span><strong>Speed:</strong></span>
        <span>{ (desktop.speed / mobile.speed).toPrecision(3) }</span>
      </p>
      <p>
        <span><strong>Usability:</strong></span>
        <span>{ (desktop.usability / mobile.usability).toPrecision(3) }</span>
      </p>
    </div>
  </div>
);

class App extends Component {
  render() {
    return (
      <div>
        <Screenshot host="www.kijiji.ca" />
        <Screenshot host="www.kijiji.ca" mobile />
        <Insights
          mobile={{ speed: 56, usability: 34 }}
          desktop={{ speed: 98, usability: 78 }}
        />
      </div>
    );
  }
}

export default App;
