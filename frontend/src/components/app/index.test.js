import React from 'react';
import ReactDOM from 'react-dom';
import {render} from 'enzyme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './index';
describe(
    'App component',
    () => {
        test(
            'renders without crashing',
            () => {
                const div = document.createElement('div');
                ReactDOM.render(<MuiThemeProvider><App isLogin={true} isAdmin={true}/></MuiThemeProvider>, div);
            }
        );

        test(
            'create an snapshot',
            () => {
                const tree = render(<MuiThemeProvider><App /></MuiThemeProvider>);
                expect(tree).toMatchSnapshot();
            }
        );
    }
);
