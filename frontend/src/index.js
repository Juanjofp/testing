import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
//import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
//import getMuiTheme from 'material-ui/styles/getMuiTheme';

import configureStore from './configureStore';
import './styles.css';
import Root from './containers/root';
import registerServiceWorker from './registerServiceWorker';

const store = configureStore();
// Material-UI requeriment
injectTapEventPlugin();
//darkBaseTheme.appBar = {textColor: 'white'};

// backgroundColor: '#00838F'
// <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
ReactDOM.render(
    <Provider
        store={store}>
        <MuiThemeProvider>
            <Root />
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
