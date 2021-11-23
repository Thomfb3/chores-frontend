import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "../auth/UserContext";
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import MenuIcon from '@mui/icons-material/Menu';

function MobileNavigation() {
    const { currentUser, currentTeam, isAdmin } = useContext(UserContext);

    const [state, setState] = useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {[["my-chores", "My Chores"],
                ["all-chores", "Everyone's Chores"],
                ["unclaimed-chores", "Unclaimed Chores"],
                ["team", "The Team"],
                ["rewards", "Rewards"]].map((text, index) => (
                    <ListItem button key={index}>
                        <NavLink to={`/${text[0]}`}
                            className="Navigation__link"
                            activeClassName="Navigation__link-active" >
                            {text[1]}
                        </NavLink>
                    </ListItem>
                ))}
            </List>
            {isAdmin ?
                <List>
                    <Divider />
                    {[["manage-chores", "Manage Chores"],
                    ["manage-rewards", "Manage Rewards"]].map((text, index) => (
                        <ListItem button key={index}>
                            <NavLink to={`/${text[0]}`}
                                className="Navigation__link"
                                activeClassName="Navigation__link-active" >
                                {text[1]}
                            </NavLink>
                        </ListItem>
                    ))}
                </List>
                : (null)}
            <Divider />
            {!currentUser ?
            (null) :
            <ListItem key="points">
                <div  className="Navigation__mobile--points-box">
                    <p className="Navigation__mobile--points-label">Your Points</p>
                    <p className="Navigation__mobile--points">{currentUser.currentPoints}pts</p>
                </div>
            </ListItem>
            }
        </Box>
    );
    return (
        
        <div className="Navigation__mobile-button-box">
            <React.Fragment key='left'>
                <Button onClick={toggleDrawer('left', true)}
                    id="Navigation__mobile-button"
                   
                >
                    <MenuIcon />
                </Button>
                <SwipeableDrawer
                    anchor='left'
                    open={state['left']}
                    onClose={toggleDrawer('left', false)}
                    onOpen={toggleDrawer('left', true)}
                >
                    {list('left')}
                </SwipeableDrawer>
            </React.Fragment>

        </div>
    );
};



export default MobileNavigation;