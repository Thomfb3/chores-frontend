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

    return (
        <div className="Profile">
            <div className="Profile__avatar">
                <React.Fragment>
                    <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center',  }}>
                        <Tooltip title="My Profile">
                            <IconButton onClick={handleClick} size="small" sx={{ ml:1 }}>
                                <Avatar
                                    alt={currentUser.username}
                                    src={defaultProfilePic}
                                    sx={{ width: 60, height: 60 }}
                                />
                            </IconButton>
                        </Tooltip>
                    </Box>
                    <Menu
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
                        <MenuItem>
                            <ListItemIcon>
                                <AccountCircleOutlinedIcon fontSize="small" />
                            </ListItemIcon>
                            My Profile
                        </MenuItem>
                        <NavLink to="/profile">
                            <MenuItem>
                                <ListItemIcon>
                                    <Edit fontSize="small" />
                                </ListItemIcon>
                                Edit Profile
                            </MenuItem>
                        </NavLink>
                        <Divider />
                        <NavLink to="/" onClick={logout}>
                            <MenuItem>
                                <ListItemIcon>
                                    <Logout fontSize="small" />
                                </ListItemIcon>
                                Logout
                            </MenuItem>
                        </NavLink>
                    </Menu>
                </React.Fragment>
            </div>

            <div className="Profile__info">
                <div className="Profile__points">
                    <p className="Profile__points--label">Your Points</p>
                    <p className="Profile__points--number">{currentUser.points}pts</p>
                </div>
                <div className="Profile__names">
                    <p className="Profile__names--user">{currentUser.firstName || currentUser.username}</p>
                    <p className="Profile__names--team">Team: {currentTeam.name}</p>
                </div>
            </div>

        </div>
    );
}


export default HeaderProfile;