import hat from 'hat';

function makeSource(geojson, sourceId) {
  const sources = {};
  sources[sourceId] = {
    type: 'geojson',
    data: geojson,
  };
  return sources;
}

const makePointLayer = (feature, sourceId) =>
  ({
    source: sourceId,
    id: hat(),
    type: 'circle',
    paint: {
      'circle-color': feature.properties['marker-color'],
      'circle-radius': 12,
    },
    filter: [
      '==',
      'id',
      feature.properties.id,
    ],
  });

const makeLineLayer = (feature, sourceId) =>
  ({
    type: 'line',
    source: sourceId,
    id: hat(),
    paint: {
      'line-color': 'stroke' in feature.properties ? feature.properties.stroke : '#555555',
      'line-opacity': 'stroke-opacity' in feature.properties ? +feature.properties['stroke-opacity'] : 1.0,
      'line-width': 'stroke-width' in feature.properties ? +feature.properties['stroke-width'] : 2,
    },
    layout: {
      'line-cap': 'round',
      'line-join': 'round',
    },
    filter: [
      '==',
      'id',
      feature.properties.id,
    ],
  });

const makePolygonLayer = (feature, sourceId) =>
  ({
    type: 'fill',
    source: sourceId,
    id: hat(),
    paint: {
      'fill-color': 'fill' in feature.properties ? feature.properties.fill : '#555555',
      'fill-opacity': 'fill-opacity' in feature.properties ? +feature.properties['fill-opacity'] : 0.5,
    },
    filter: [
      '==',
      'id',
      feature.properties.id,
    ],
  });

function makeLayer(feature, sourceId, geometry) {
  if (geometry === 'Point') {
    return (makePointLayer(feature, sourceId));
  } else if (geometry === 'LineString') {
    return (makeLineLayer(feature, sourceId));
  } else if (geometry === 'Polygon') {
    return (makePolygonLayer(feature, sourceId));
  }
  return null;
}

function addLayers(geojsonIn, sourceId, layers) {
  const geojson = Object.assign(geojsonIn);
  switch (geojson.type) {
    case 'FeatureCollection':
      geojson.features.forEach((feature) => {
        addLayers(feature, sourceId, layers);
      });
      break;
    default:
      throw new Error('unknown or unsupported GeoJSON type');
    case 'Feature':
      switch (geojson.geometry.type) {
        case 'Point':
          if (!geojson.properties) geojson.properties = {};
          geojson.properties.id = hat();
          layers.push(makeLayer(geojson, sourceId, 'Point'));
          break;
        case 'LineString':
          if (!geojson.properties) geojson.properties = {};
          geojson.properties.id = hat();
          layers.push(makeLayer(geojson, sourceId, 'LineString'));
          break;
        case 'Polygon':
          if (!geojson.properties) geojson.properties = {};
          geojson.properties.id = hat();
          layers.push(makeLayer(geojson, sourceId, 'LineString'));
          layers.push(makeLayer(geojson, sourceId, 'Polygon'));
          break;
        default:
          console.error(`TODO: unsupported GeoJSON geometry type ${geojson.geometry.type}`);
      }
  }
  return layers;
}

export default function convert(geojson) {
  const sourceId = hat();

  return {
    version: 8,
    sources: makeSource(geojson, sourceId),
    layers: addLayers(geojson, sourceId, []),
    glyphs: 'mapbox://fonts/mapbox/{fontstack}/{range}.pbf',
  };
}
