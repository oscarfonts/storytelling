import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

injectTapEventPlugin();

const rootElement = document.createElement('div');
document.body.appendChild(rootElement);

ReactDOM.render(
  <MuiThemeProvider>
    <RaisedButton label="This is a button" />
  </MuiThemeProvider>,
  rootElement,
);

export default true;
