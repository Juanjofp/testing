import React from 'react';
import ReactDOM from 'react-dom';
import {shallow, mount, render} from 'enzyme';
import {MemoryRouter} from 'react-router-dom';
import {DrawerMenu} from './index';

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;
jest.useFakeTimers();

describe(
    'DrawerMenu',
    () => {
        it(
            'renders without crashing', 
            () => {
                const div = document.createElement('div');
                ReactDOM.render(
                    <MemoryRouter>
                        <DrawerMenu
                            isOpen={true}
                            closeDrawer={()=>{}}
                            isLogin={false}
                            isAdmin={false}
                            location={{pathname: '/'}}/>
                    </MemoryRouter>,
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
                    <MemoryRouter>
                        <DrawerMenu
                            isOpen={false}
                            closeDrawer={()=>{}}
                            isLogin={false}
                            isAdmin={false}
                            location={{pathname: '/'}}/>
                    </MemoryRouter>
                );
                expect(tree).toMatchSnapshot();
            }
        );

        it(
            'when is Closed do not render Menuitems',
            () => {
                const wraper = mount(
                    <MemoryRouter>
                        <DrawerMenu
                            isOpen={false}
                            closeDrawer={()=>{}}
                            isLogin={false}
                            isAdmin={false}
                            location={{pathname: '/'}}/>
                    </MemoryRouter>
                );
                const isOpen = wraper.find('DrawerMenu').props().isOpen;
                expect(isOpen).toBe(false);
            }
        );

        it(
            'when is Anonymous Renders 2 Menuitems',
            () => {
                const wraper = mount(
                    <MemoryRouter>
                        <DrawerMenu
                            isOpen={true}
                            closeDrawer={()=>{}}
                            isLogin={false}
                            isAdmin={false}
                            location={{pathname: '/'}}/>
                    </MemoryRouter>
                );
                const menuItems = wraper.find('ListItem');
                expect(menuItems.length).toBe(2);
                expect(menuItems.first().contains('HOME')).toBe(true);
                expect(menuItems.at(1).contains('LOGIN')).toBe(true);
            }
        );

        it(
            'when is Login Renders 3 Menuitems',
            () => {
                const wraper = mount(
                    <MemoryRouter>
                        <DrawerMenu
                            isOpen={true}
                            closeDrawer={()=>{}}
                            isLogin={true}
                            isAdmin={false}
                            location={{pathname: '/'}}/>
                    </MemoryRouter>
                );
                const menuItems = wraper.find('ListItem');
                expect(menuItems.length).toBe(3);
                expect(menuItems.first().contains('HOME')).toBe(true);
                expect(menuItems.at(1).contains('PRIVATE')).toBe(true);
                expect(menuItems.at(2).contains('LOGOUT')).toBe(true);
            }
        );

        it(
            'when is Admin Renders 4 Menuitems',
            () => {
                const wraper = mount(
                    <MemoryRouter>
                        <DrawerMenu
                            isOpen={true}
                            closeDrawer={()=>{}}
                            isLogin={true}
                            isAdmin={true}
                            location={{pathname: '/'}}/>
                    </MemoryRouter>
                );
                const menuItems = wraper.find('ListItem');
                expect(menuItems.length).toBe(4);
                expect(menuItems.first().contains('HOME')).toBe(true);
                expect(menuItems.at(1).contains('PRIVATE')).toBe(true);
                expect(menuItems.at(2).contains('ADMIN')).toBe(true);
                expect(menuItems.at(3).contains('LOGOUT')).toBe(true);
            }
        );
    }
);
