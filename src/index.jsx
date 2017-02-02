import React from 'react';
import ReactDOM from 'react-dom';

import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './styles.css';
import Map from './components/Map';
import GeoJSON from './components/GeoJSON';

injectTapEventPlugin();

const rootElement = document.createElement('div');
document.body.appendChild(rootElement);

function getParameterByName(paramName) {
  const url = window.location.href;
  const name = paramName.replace(/[[\]]/g, '\\$&');

  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'); // eslint-disable-line
  const results = regex.exec(url);
  if (!results) return undefined;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

const src = getParameterByName('src');

ReactDOM.render(
  <MuiThemeProvider>
    <Map>
      <GeoJSON src={src} />
    </Map>
  </MuiThemeProvider>,
  rootElement,
);

export default true;
