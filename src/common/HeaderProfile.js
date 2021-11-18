import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "../auth/UserContext";
import defaultProfileImage from '../assets/images/default-profile-pic.gif';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Edit from '@mui/icons-material/Edit';
import Logout from '@mui/icons-material/Logout';
import Box from '@mui/material/Box';


function HeaderProfile({ logout }) {
    const { currentUser, currentTeam } = useContext(UserContext);
    const defaultProfilePic = (currentUser.profileImage === "defaultProfile.jpg")
        ? defaultProfileImage
        : currentUser.profileImage;

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const menuStyles = {
        textDecoration: "none",
        color: "rgb(16, 147, 255)"
    }

    return (
        <div className="Profile">
            <div className="Profile__avatar">
                <React.Fragment>
                    <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center'}}>
                        <Tooltip title={<p>My Profile</p>} >
                            <IconButton onClick={handleClick} size="small" sx={{ ml:1 }}>
                                <Avatar
                                    className="Profile__avatar--component"
                                    alt={currentUser.username}
                                    src={defaultProfilePic}
                                    sx={{ width: 65, height: 65 }}
                                />
                            </IconButton>
                        </Tooltip>
                    </Box>
                    <Menu
                        className="Profile__menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                        PaperProps={{
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 1.5,
                                '& .MuiAvatar-root': {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                },
                                '&:before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0,
                                },
                            },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >   
                    
                        <MenuItem sx={menuStyles}>
                            <ListItemIcon >
                                <AccountCircleOutlinedIcon sx={menuStyles} />
                            </ListItemIcon>
                            My Profile
                        </MenuItem>
                        <NavLink to="/profile" style={{ textDecoration: 'none' }}>
                            <MenuItem sx={menuStyles} >
                                <ListItemIcon>
                                    <Edit sx={menuStyles}  />
                                </ListItemIcon>
                                Edit Profile
                            </MenuItem>
                        </NavLink>
                    
                        <Divider />
                        <NavLink to="/" onClick={logout} style={{ textDecoration: 'none' }}>
                            <MenuItem sx={menuStyles} >
                                <ListItemIcon>
                                    <Logout sx={menuStyles} />
                                </ListItemIcon>
                                Logout
                            </MenuItem>
                        </NavLink>
                    </Menu>
                </React.Fragment>
            </div>
            {currentTeam &&
            <div className="Profile__info">
                <div className="Profile__points">
                    <p className="Profile__points--label">Your Points</p>
                    <p className="Profile__points--number">{currentUser.currentPoints}<span>pts</span></p>
                </div>
                <div className="Profile__names">
                    <p className="Profile__names--user">{currentUser.firstName || currentUser.username}</p>
                    <p className="Profile__names--team">Team: {currentTeam.name}</p>
                </div>
            </div>
            }
            {!currentTeam &&
                <div className="">
                    <p className="Profile__names--team">You need to be on a team.</p>
                </div>
            }
        </div>
    );
}


export default HeaderProfile;