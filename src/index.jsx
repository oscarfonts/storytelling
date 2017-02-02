import React from 'react';
import ReactDOM from 'react-dom';

import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './styles.css';
import Map from './components/Map';

injectTapEventPlugin();

ReactDOM.render(
  <MuiThemeProvider>
    <Map />
  </MuiThemeProvider>,
  document.body,
);

export default true;
