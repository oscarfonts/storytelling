import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Map from './components/Map';

injectTapEventPlugin();

const rootElement = document.createElement('div');
document.body.appendChild(rootElement);

ReactDOM.render(
  <MuiThemeProvider>
    <div>
      <Map
        width={400} height={400}
        mapboxApiAccessToken="pk.eyJ1Ijoib3NjYXJmb250cyIsImEiOiJ0VFU5eW1VIn0.4MelWeJR1VBftrI84tKULw"
      />
      <RaisedButton label="Material button" />
    </div>
  </MuiThemeProvider>,
  rootElement,
);

export default true;
