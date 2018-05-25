import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import renderer from 'react-test-renderer';
import {shallow, mount, render} from 'enzyme';
import {MemoryRouter} from 'react-router-dom';
import {DrawerMenu} from './index';

describe(
    'DrawerMenu',
    () => {
        it(
            'renders without crashing', 
            () => {
                const div = document.createElement('div');
                ReactDOM.render(
                    <MuiThemeProvider>
                        <MemoryRouter>
                            <DrawerMenu
                                isOpen={true}
                                closeDrawer={()=>{}}
                                isLogin={false}
                                isAdmin={false}
                                location={{pathname: '/'}}/>
                        </MemoryRouter>
                    </MuiThemeProvider>,
                    div
                );
            }
        );

        it(
            'renders shallow without crash',
            () => {
                const wraper = shallow(
                    <DrawerMenu
                        isOpen={true}
                        closeDrawer={()=>{}}
                        isLogin={false}
                        isAdmin={false}
                        location={{pathname: '/'}}/>
                );
            }
        );

        it(
            'create an snapshot for drawer',
            () => {
                const tree = render(
                    <MuiThemeProvider>
                        <MemoryRouter>
                            <DrawerMenu
                                isOpen={false}
                                closeDrawer={()=>{}}
                                isLogin={false}
                                isAdmin={false}
                                location={{pathname: '/'}}/>
                        </MemoryRouter>
                    </MuiThemeProvider>
                );
                expect(tree).toMatchSnapshot();
            }
        );

        it(
            'when is Closed do not render Menuitems',
            () => {
                const wraper = mount(
                    <MuiThemeProvider>
                        <MemoryRouter>
                            <DrawerMenu
                                isOpen={false}
                                closeDrawer={()=>{}}
                                isLogin={false}
                                isAdmin={false}
                                location={{pathname: '/'}}/>
                        </MemoryRouter>
                    </MuiThemeProvider>
                );
                const isOpen = wraper.find('DrawerMenu').props().isOpen;
                expect(isOpen).toBe(false);
            }
        );

        it(
            'when is Anonymous Renders 3 Menuitems',
            () => {
                const wraper = mount(
                    <MuiThemeProvider>
                        <MemoryRouter>
                            <DrawerMenu
                                isOpen={true}
                                closeDrawer={()=>{}}
                                isLogin={false}
                                isAdmin={false}
                                location={{pathname: '/'}}/>
                        </MemoryRouter>
                    </MuiThemeProvider>
                );
                const menuItems = wraper.find('MenuItem');
                expect(menuItems.length).toBe(3);
                expect(menuItems.first().contains('HOME')).toBe(true);
                expect(menuItems.at(2).contains('LOGIN')).toBe(true);
            }
        );

        it(
            'when is Login Renders 3 Menuitems',
            () => {
                const wraper = mount(
                    <MuiThemeProvider>
                        <MemoryRouter>
                            <DrawerMenu
                                isOpen={true}
                                closeDrawer={()=>{}}
                                isLogin={true}
                                isAdmin={false}
                                location={{pathname: '/'}}/>
                        </MemoryRouter>
                    </MuiThemeProvider>
                );
                const menuItems = wraper.find('MenuItem');
                expect(menuItems.length).toBe(3);
                expect(menuItems.first().contains('HOME')).toBe(true);
                expect(menuItems.at(2).contains('CLOSE')).toBe(true);
            }
        );

        it(
            'when is Admin Renders 4 Menuitems',
            () => {
                const wraper = mount(
                    <MuiThemeProvider>
                        <MemoryRouter>
                            <DrawerMenu
                                isOpen={true}
                                closeDrawer={()=>{}}
                                isLogin={true}
                                isAdmin={true}
                                location={{pathname: '/'}}/>
                        </MemoryRouter>
                    </MuiThemeProvider>
                );
                const menuItems = wraper.find('MenuItem');
                expect(menuItems.length).toBe(4);
                expect(menuItems.first().contains('HOME')).toBe(true);
                expect(menuItems.at(3).contains('CLOSE')).toBe(true);
            }
        );
    }
);
