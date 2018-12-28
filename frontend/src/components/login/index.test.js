import React from 'react';
import ReactDOM from 'react-dom';
import {shallow, mount, render} from 'enzyme';

import Login from './index';
import { wrap } from 'module';

const onClick = jest.fn();
const doLogin = jest.fn();
const clearErrorMessage = jest.fn();

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;
jest.useFakeTimers();

describe(
    'Login component',
    () => {
        it(
            'renders without crashing', () => {
            const div = document.createElement('div');
            ReactDOM.render(
                <Login
                    location={{from: '/'}}/>,
                div);
            }
        );

        it(
            'create an snapshot',
            () => {
                const tree = render(
                    <Login location={{from: '/'}}/>
                );
                expect(tree).toMatchSnapshot();
            }
        );

        it(
            'create an snapshot while loading',
            () => {
                const tree = render(
                    <Login location={{from: '/'}} isLoading={true}/>
                );
                expect(tree).toMatchSnapshot();
            }
        );

        it(
            'create an snapshot with errors',
            () => {
                const tree = render(
                    <Login location={{from: '/'}} hasErrors={{message: 'Invalid user'}}/>
                );
                expect(tree).toMatchSnapshot();
            }
        );

        it(
            'renders login and password inputs',
            () => {
                const wraper = mount(
                    <Login location={{from: '/'}}/>
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
                    <Login
                        location={{from: '/'}}
                        login={doLogin}
                        username='juanjo'
                        password='franco'/>,
                );
                const inputUsername = wraper.find('[data-testid="login-email"]').last();
                const inputPassword = wraper.find('[data-testid="login-password"]').last();
                const buttonLogin = wraper.find('[data-testid="login-submit"]').last();
                expect(inputUsername.exists()).toBe(true);
                expect(inputPassword.exists()).toBe(true);
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
                    <Login
                        location={{from: '/'}}
                        hasErrors={{message: 'Invalid User'}}
                        loginClearError={clearErrorMessage}/>,
                );
                let errorText = wraper.find('[data-testid="error-message"]').first();
                expect(errorText.exists()).toBe(true);
                //console.log('>>>>>>>< Wrapper', errorText.debug());
                // Implementation details, never test this!!!
                expect(errorText.childAt(0).props().open).toBe(true);
                expect(clearErrorMessage.mock.calls.length).toBe(0);
                // Run all timers now!
                jest.runAllTimers();
                expect(clearErrorMessage.mock.calls.length).toBe(1);
            }
        );
    }
);