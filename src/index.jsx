import React from 'react';
import ReactDOM from 'react-dom';

import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './styles.css';
import Map from './components/Map';
import Layer from './components/Layer';

injectTapEventPlugin();

ReactDOM.render(
  <MuiThemeProvider>
    <Map>
      <Layer />
    </Map>
  </MuiThemeProvider>,
  document.body,
);

export default true;
