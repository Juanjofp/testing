import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import ContentLink from '@material-ui/icons/Link';
import HomeIcon from '@material-ui/icons/Home';
import SelectedIcon from '@material-ui/icons/Bookmark';
import './styles.css';

const emptyUser = {
    username: 'jhon@doe',
    avatar: 'https://quizup-players.imgix.net/avatars/Avatar_astronaut-large-hd.png'
};

export const DrawerMenu = ({isOpen, closeDrawer, isLogin, isAdmin, user = emptyUser, location: {pathname = '/'}}) => {
    return (
        <Drawer
            open={isOpen}>
            <Paper style={{padding: 20, backgroundColor: '#00838F'}}>
                <Avatar src={user.avatar} alt={user.username} size={80} data-testid='drawer-avatar'/>
                <div style={{color: 'white'}}>{user.username}</div>
            </Paper>
            <Divider />
            <List>
                <ListItem
                    button
                    onClick={closeDrawer}
                    selected={pathname === '/'}
                    component={Link}
                    exact='true' to='/'>
                        <ListItemIcon><HomeIcon/></ListItemIcon>
                        <ListItemText primary={'HOME'}/>
                </ListItem>
                {
                    isLogin &&
                    (
                        <ListItem
                            button
                            onClick={closeDrawer}
                            selected={pathname === '/private'}
                            component={Link}
                            to={`/private`}>
                                <ListItemIcon><SelectedIcon/></ListItemIcon>
                                <ListItemText primary={'PRIVATE'}/>
                        </ListItem>
                    )
                }
                {
                    isLogin &&
                    isAdmin &&
                    (
                        <ListItem
                            button
                            onClick={closeDrawer}
                            selected={pathname === '/admin'}
                            component={Link}
                            to={`/admin`}>
                            <ListItemIcon><ContentLink/></ListItemIcon>
                            <ListItemText primary={'ADMIN'}/>
                        </ListItem>
                    )
                }
                <ListItem
                    button
                    onClick={closeDrawer}
                    selected={pathname === '/login'}
                    component={Link}
                    to={isLogin ? '/logout' : '/login'}>
                    {
                        isLogin ?
                        <ListItemText primary={'LOGOUT'}/> :
                        <ListItemText primary={'LOGIN'}/>
                    }
                </ListItem>
            </List>
        </Drawer>
    );
};
DrawerMenu.displayName= 'DrawerMenu';

export default DrawerMenu;
