import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import { Link } from 'react-router-dom';
import Avatar from 'material-ui/Avatar';
import ContentLink from 'material-ui/svg-icons/content/link';
import HomeIcon from 'material-ui/svg-icons/action/home';
import Selected from 'material-ui/svg-icons/action/bookmark';
import './styles.css';

const emptyUser = {
    username: 'jhon@doe',
    avatar: 'https://quizup-players.imgix.net/avatars/Avatar_astronaut-large-hd.png'
};

export const DrawerMenu = ({isOpen, closeDrawer, isLogin, isAdmin, user = emptyUser, location: {pathname = '/'}}) => {
    //console.log('pathname', pathname);
    return (
        <Drawer
            open={isOpen}
            docked={false}
            disableSwipeToOpen={true}
            onRequestChange={closeDrawer}
            containerStyle={{backgroundColor: 'white'}}>
            <Paper zDepth={2} style={{padding: 20, backgroundColor: '#00838F'}}>
                <Avatar src={user.avatar} alt={user.username} size={80} data-testid='drawer-avatar'/>
                <div style={{color: 'white'}}>{user.username}</div>
            </Paper>
            <Divider />
            <MenuItem
                primaryText = 'HOME'
                onClick={closeDrawer}
                leftIcon={<HomeIcon/>}
                containerElement={
                    <Link exact='true' to='/'/>
                }
                rightIcon={(pathname === '/') ? <Selected/> : null}/>
            <MenuItem
                primaryText = 'PRIVATE'
                onClick={closeDrawer}
                leftIcon={<HomeIcon/>}
                containerElement={
                    <Link to={`/private`}/>
                }
                rightIcon={(pathname === '/private') ? <Selected/> : null}/>
            {
                isLogin &&
                isAdmin &&
                (
                    <MenuItem
                        primaryText = 'ADMIN'
                        onClick={closeDrawer}
                        leftIcon={<HomeIcon/>}
                        containerElement={
                            <Link to='/admin'/>
                        }
                        rightIcon={(pathname === '/admin') ? <Selected/> : null}/>
                )
            }
            <MenuItem
                primaryText={isLogin ? 'CLOSE' : 'LOGIN'} 
                onClick={closeDrawer}
                leftIcon={isLogin ? <HomeIcon/> : <ContentLink/>}
                containerElement={
                    isLogin ?
                    <Link to='/logout'/> :
                    <Link to='/login'/>
                }
                rightIcon={(pathname === '/login') ? <Selected/> : null}/>
        </Drawer>
    );
};
DrawerMenu.displayName= 'DrawerMenu';

export default DrawerMenu;
