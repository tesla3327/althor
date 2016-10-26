import React, { Component } from 'react';
import './ViewProspect.css';
import TemplateValues from './TemplateValues';

const Screenshot = ({ host, mobile, api }) => (
  <a href={ `http://${host}` }>
    <img
      className="screenshot"
      src={ `${api}/screenshot/${ mobile ? 'mobile' : 'desktop' }/${host}` }
      role="presentation"
    />
  </a>
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

class ViewProspect extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      phone: '',
      contactName: {
        first: '',
        last: ''
      },
      companyName: ''
    };
  }

  handleEmail(e) {
    this.setState({ email: e.target.value });
  }

  handleFirstName(e) {
    this.setState({
      contactName: {
        first: e.target.value,
        last: this.state.contactName.last,
      },
    });
  }

  handleLastName(e) {
    this.setState({
      contactName: {
        first: this.state.contactName.first,
        last: e.target.value,
      },
    });
  }

  handlePhone(e) {
    this.setState({ phone: e.target.value });
  }

  handleCompanyName(e) {
    this.setState({ companyName: e.target.value });
  }

  qualify() {
    const updateInfo = this.state;
    updateInfo.qualified = true;

    const opts = {
      method: 'PATCH',
      body: JSON.stringify(updateInfo),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    };

    fetch(`${this.props.api}/prospect/${this.props.hostname}`, opts)
      .then( console.log )
      .then( () => this.props.nextProspect() )
      .catch( console.error );
  }

  reject() {
    const opts = {
      method: 'PATCH',
      body: JSON.stringify({ qualified: false }),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    };

    fetch(`${this.props.api}/prospect/${this.props.hostname}`, opts)
      .then( console.log )
      .then( () => this.props.nextProspect() )
      .catch( console.error );
  }

  render() {
    const callbacks = {
      handlePhone: this.handlePhone.bind(this),
      handleEmail: this.handleEmail.bind(this),
      handleCompanyName: this.handleCompanyName.bind(this),
      handleLastName: this.handleLastName.bind(this),
      handleFirstName: this.handleFirstName.bind(this),
    };

    return (
      <div>
        <div className="upper-view">
          <div className="screenshots">
            <Screenshot
              host={ this.props.hostname }
              api={ this.props.api }
              mobile
            />
            <Screenshot
              host={ this.props.hostname }
              api={ this.props.api }
            />
          </div>
          <Insights
            mobile={{
              speed: this.props.mobileInsights.ruleGroups.SPEED.score,
              usability: this.props.mobileInsights.ruleGroups.USABILITY.score,
            }}
            desktop={{ speed: this.props.desktopInsights.ruleGroups.SPEED.score }}
          />
        </div>
        <TemplateValues callbacks={ callbacks } values={ this.state }/>
        <div className="actions">
          <button className="qualify" onClick={ this.qualify.bind(this) }>Qualify</button>
          <button className="reject" onClick={ this.reject.bind(this) }>Reject</button>
        </div>
      </div>
    );
  }
}

export default ViewProspect;
