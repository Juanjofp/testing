import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import configureStore from './configureStore';
import './styles.css';
import Root from './containers/root';
import registerServiceWorker from './registerServiceWorker';
import {
    loadAuth
} from './services/local-storage';

const auth = loadAuth();
console.log('Auth loaded!', auth);
const store = configureStore(auth);
const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
    }
});

ReactDOM.render(
    <Provider
        store={store}>
        <MuiThemeProvider theme={theme}>
            <Root />
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
