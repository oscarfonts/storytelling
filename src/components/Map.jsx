import React, { Component } from 'react';

import MapGL from 'react-map-gl';

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        hash: true,
        latitude: 41.3949,
        longitude: 2.1756,
        zoom: 13,
        startDragLngLat: null,
        isDragging: false,
        width: '100%',
        height: '100%',
        bearing: -45,
        pitch: 0.001,
        mapStyle: 'http://demo.fonts.cat:8001/styles/bright-v9.json',
      },
    };
    this.state.viewport = Object.assign(this.state.viewport, props);
    this.onChangeViewport = this.onChangeViewport.bind(this);
  }

  onChangeViewport(newViewport) {
    const viewport = Object.assign({}, this.state.viewport, newViewport);
    this.setState({ viewport });
  }

  render() {
    return (<MapGL
      {...this.state.viewport}
      onChangeViewport={this.onChangeViewport}
    />);
  }
}
