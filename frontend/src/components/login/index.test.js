import React from 'react';
import ReactDOM from 'react-dom';
import {shallow, mount} from 'enzyme';
import renderer from 'react-test-renderer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import TextField from 'material-ui/TextField';

import Login from './index';
import { wrap } from 'module';

const onClick = jest.fn();
const doLogin = jest.fn();
const clearErrorMessage = jest.fn();

// Avoid waitings...
jest.useFakeTimers();
describe(
    'Login component',
    () => {
        it(
            'renders without crashing', () => {
            const div = document.createElement('div');
            ReactDOM.render(
                <MuiThemeProvider>
                    <Login
                        location={{from: '/'}}/>
                </MuiThemeProvider>,
                div);
            }
        );

        it(
            'create an snapshot',
            () => {
                const tree = renderer.create(
                    <MuiThemeProvider><Login location={{from: '/'}}/></MuiThemeProvider>
                ).toJSON();
                expect(tree).toMatchSnapshot();
            }
        );

        it(
            'create an snapshot while loading',
            () => {
                const tree = renderer.create(
                    <MuiThemeProvider><Login location={{from: '/'}} isLoading={true}/></MuiThemeProvider>
                ).toJSON();
                expect(tree).toMatchSnapshot();
            }
        );

        it(
            'create an snapshot with errors',
            () => {
                const tree = renderer.create(
                    <MuiThemeProvider><Login location={{from: '/'}} hasErrors={{message: 'Invalid user'}}/></MuiThemeProvider>
                ).toJSON();
                expect(tree).toMatchSnapshot();
            }
        );

        it(
            'renders login and password inputs',
            () => {
                const wraper = mount(
                    <MuiThemeProvider>
                        <Login
                            location={{from: '/'}}/>
                    </MuiThemeProvider>
                );
                expect(wraper.find('[data-testid="login-email"]').exists()).toBe(true);
                expect(wraper.find('[data-testid="login-password"]').exists()).toBe(true);
                expect(wraper.find('[data-testid="login-submit"]').exists()).toBe(true);
            }
        );

        it(
            'renders button and submit credentials',
            () => {
                const wraper = mount(
                    <MuiThemeProvider>
                        <Login
                            location={{from: '/'}}
                            login={doLogin}
                            username='juanjo'
                            password='franco'/>
                    </MuiThemeProvider>,
                );
                const inputUsername = wraper.find('[data-testid="login-email"]').last();
                const buttonLogin = wraper.find('[data-testid="login-submit"]').last();
                expect(buttonLogin.exists()).toBe(true);
                buttonLogin.props().onClick();
                expect(doLogin.mock.calls.length).toBe(1);
                expect(doLogin).toHaveBeenCalledWith('juanjo', 'franco');
            }
        );

        it(
            'renders errors and clear message after a few seconds',
            () => {
                const wraper = mount(
                    <MuiThemeProvider>
                        <Login
                            location={{from: '/'}}
                            hasErrors={{message: 'Invalid User'}}
                            loginClearError={clearErrorMessage}/>
                    </MuiThemeProvider>,
                );
                let errorText = wraper.find('[data-testid="error-message"]').last();
                expect(errorText.exists()).toBe(true);
                expect(errorText.childAt(0).props().open).toBe(true);
                expect(clearErrorMessage.mock.calls.length).toBe(0);
                // Run all timers now!
                jest.runAllTimers();
                expect(clearErrorMessage.mock.calls.length).toBe(1);
            }
        );
    }
);