import React, { Component } from 'react';

import { GeoJSONLayer } from 'react-mapbox-gl';

export default class Layer extends Component {
  static defaultProps = {
    data: 'https://gist.githubusercontent.com/oscarfonts/05df3c99c2c76668aa9f9a30ef362caf/raw/b12437ef907dc4441737b6ce5411932e501912de/map.geojson',
    lineLayout: {
      'line-join': 'round',
      'line-cap': 'round',
    },
    linePaint: {
      'line-color': '#0000FF',
      'line-width': 8,
      'line-blur': 1,
    },
    fillLayout: {
      visibility: false,
    },
    circleLayout: {
      visibility: false,
    },
  };

  render() {
    return (<GeoJSONLayer
      {...this.props}
    />);
  }
}
