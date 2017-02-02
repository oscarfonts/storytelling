import React, { Component } from 'react';

import ReactMapboxGl from 'react-mapbox-gl';

export default class Map extends Component {
  static defaultProps = {
    style: 'http://demo.fonts.cat:8001/styles/bright-v9.json',
    accessToken: 'ReactMapboxGl makes this property mandatory but it is useless w/custom layer',
    center: [2.1756, 41.3949],
    zoom: [13],
    bearing: -45,
    containerStyle: {
      height: '100%',
    },
    hash: true,
  };

  render() {
    return (<ReactMapboxGl
      {...this.props}
    />);
  }
}
