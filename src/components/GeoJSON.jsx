import React, { Component } from 'react';

import 'whatwg-fetch';

import { Layer, Source } from 'react-mapbox-gl';

import convert from './simplespec-to-gl-style';

export default class GeoJSON extends Component {
  static propTypes = {
    src: React.PropTypes.string,
  };

  static defaultProps = {
    src: 'https://gist.githubusercontent.com/anonymous/0ae2ce2db6e3acf1a1aa528b4a320f51/raw/6766218316a5bbba348970943c7ada6f94ea58e6/map.geojson',
  };

  constructor(props) {
    super(props);
    this.transformData = this.transformData.bind(this);
    this.getData(props.src);
  }

  state = {
    sources: [],
    layers: [],
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.src !== this.props.src) {
      this.resetState();
      this.getData(nextProps.src);
    }
  }

  getData(src) {
    return fetch(src)
      .then(response => response.json())
      .then(this.transformData);
  }

  resetState() {
    this.setState(this.initialState);
  }

  transformData(geojson) {
    const style = convert(geojson);

    const layers = style.layers.map(layer =>
      Object.assign(layer, {
        sourceId: layer.source,
        key: layer.id,
        layerOptions: {
          filter: layer.filter,
        },
      }),
    ).reverse();

    const sources = Object.keys(style.sources).reduce((red, sourceId) =>
      (style.sources[sourceId].type === 'geojson' ?
      [...red, {
        key: sourceId,
        id: sourceId,
        sourceOptions: style.sources[sourceId],
      }] : red), []);

    this.setState({ layers, sources });
  }

  render() {
    return (<div>
      { this.state.sources.map(props => <Source {...props} />) }
      { this.state.layers.map(props => <Layer {...props} />) }
    </div>);
  }
}
