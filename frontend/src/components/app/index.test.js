import React from 'react';
import ReactDOM from 'react-dom';
import {render} from 'enzyme';
import App from './index';

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

describe(
    'App component',
    () => {
        test(
            'renders without crashing',
            () => {
                const div = document.createElement('div');
                ReactDOM.render(<App isLogin={true} isAdmin={true}/>, div);
            }
        );

        test(
            'create an snapshot',
            () => {
                const tree = render(<App />);
                expect(tree).toMatchSnapshot();
            }
        );
    }
);
