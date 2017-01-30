import React, { Component } from 'react';

import MapGL from 'react-map-gl';

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 41,
        longitude: 2,
        zoom: 8,
        startDragLngLat: null,
        isDragging: false,
      },
    };
    this.onChangeViewport = this.onChangeViewport.bind(this);
  }

  onChangeViewport(viewport) {
    this.setState({ viewport });
  }

  render() {
    const viewport = Object.assign({}, this.state.viewport, this.props);
    return (<MapGL
      {...viewport}
      onChangeViewport={this.onChangeViewport}
    />);
  }
}
