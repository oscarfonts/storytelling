import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import RaisedButton from 'material-ui/RaisedButton';
import Map from './components/Map';

import './styles.css';

injectTapEventPlugin();

ReactDOM.render(
  <MuiThemeProvider>
    <div id="container">
      <Map />
    </div>
  </MuiThemeProvider>,
  document.body,
);

// <RaisedButton label="Material button" />

export default true;
