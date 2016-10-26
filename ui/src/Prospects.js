import React, { Component } from 'react';
import ViewProspect from './ViewProspect';

class Prospects extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentProspect: null,
    };

    fetch(`${props.api}/prospects`)
      .then( data => data.json() )
      .then( data => data.reverse() )
      .then( prospects => {
        const currentProspect = prospects.pop();

        console.log(prospects);
        console.log(currentProspect);

        this.setState({
          currentProspect,
          prospects
        });
      })
      .catch( console.error );
  }

  nextProspect() {
    const prospects = this.state.prospects;
    const currentProspect = prospects.pop();

    console.log(currentProspect);

    this.setState({
      prospects,
      currentProspect,
    });
  }

  render() {
    if (this.state.currentProspect) {
      return (
        <ViewProspect
          api={ this.props.api }
          hostname={ this.state.currentProspect.hostname }
          mobileInsights={ this.state.currentProspect.mobile.insights }
          desktopInsights={ this.state.currentProspect.desktop.insights }
          nextProspect={ this.nextProspect.bind(this) }
        />
      );
    } else {
      return (<div>Loading</div>);
    }
  }
}

export default Prospects;
