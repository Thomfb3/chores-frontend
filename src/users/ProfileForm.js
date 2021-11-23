import React, { useState, useContext } from "react";
import ChoresApi from "../api/api";
import UserContext from "../auth/UserContext";
import AppAlert from "../common/AppAlert";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

function ProfileForm() {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const [formData, setFormData] = useState({
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        profileImage: currentUser.profileImage,
        password: ""
    });

    const [formErrors, setFormErrors] = useState([]);
    const [saveConfirmed, setSaveConfirmed] = useState(false);

    console.debug(
        "ProfileForm",
        "currentUser=", currentUser,
        "formData=", formData,
        "formErrors=", formErrors,
        "saveConfirmed=", saveConfirmed
    );

    const [values, setValues] = useState({
        showPassword: false
    })

    const handleClickShowPassword = () => {
        setValues({
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    async function handleSubmit(evt) {
        evt.preventDefault();
        const profileData = {
            username: currentUser.username,
            firstName: formData.firstName,
            lastName: formData.lastName,
            profileImage: formData.profileImage,
            password: formData.password
        };
        let updatedUser;
        try {
            updatedUser = await ChoresApi.saveProfile(currentUser._id, profileData);
            setSaveConfirmed(true);
        } catch (errors) {
            setFormErrors(errors);
            return;
        };
        setFormData(f => ({ ...f, password: "" }));
        setFormErrors([]);
        setCurrentUser(updatedUser);
    };

    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData(f => ({ ...f, [name]: value }));
        setFormErrors([]);
    };

    return (
        <div className="Form">
            <div className="Form__title">
                <div className="Form__list-title">Update Profile</div>
                <div className="Form__divider"></div>
            </div>
            <div className="Form__form-container">
                <Paper
                    elevation={3}
                    sx={{
                        width: '50%', paddingTop: '30px', margin: 'auto', marginTop: '50px', paddingBottom: '10px',
                        '@media (max-width:900px)': {
                            width: '90%'
                        }
                    }}>
                    <form className="Form" onSubmit={handleSubmit}>
                        <div className="Form__box-title">Profile Form</div>
                        <div className="Form-group">
                            <TextField
                                id="firstName"
                                label="First Name"
                                className="Form-input"
                                variant="outlined"
                                placeholder="  "
                                name="firstName"
                                type="text"
                                value={formData.firstName}
                                onChange={handleChange}
                                sx={{ m: 1, width: '95%' }}
                            />
                        </div>
                        <div className="Form-group">
                            <TextField
                                id="lastName"
                                label="Last Name"
                                className="Form-input"
                                variant="outlined"
                                placeholder="  "
                                name="lastName"
                                type="text"
                                value={formData.lastName}
                                onChange={handleChange}
                                sx={{ m: 1, width: '95%' }}
                            />
                        </div>
                        <div className="Form-group">
                            <TextField
                                id="profileImage"
                                label="Profile Image"
                                className="Form-input"
                                variant="outlined"
                                placeholder="  "
                                name="profileImage"
                                type="text"
                                value={formData.profileImage}
                                onChange={handleChange}
                                sx={{ m: 1, width: '95%' }}
                            />
                        </div>

                        <FormControl sx={{ m: 1, width: '95%' }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Enter Current Password</InputLabel>
                            <OutlinedInput
                                id="password"
                                label="Enter Current Password"
                                variant="outlined"
                                type={values.showPassword ? 'text' : 'password'}
                                className="Form-input"
                                placeholder="  "
                                name="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>

                        {formErrors.length
                            ? <AppAlert severity="error" messages={formErrors} />
                            : null}
                        {saveConfirmed
                            ?
                            <AppAlert severity="success" messages={["Updated successfully."]} />
                            : null}
                        <div className="Form-group" style={{ textAlign: 'right' }}>
                            <Button
                                sx={{ m: 1, backgroundColor: '#1193ff', borderRadius: '5px' }}
                                variant="contained"
                                type="submit"
                                onSubmit={handleSubmit}
                            >
                                Update Profile
                             </Button>
                        </div>
                    </form>
                    <small className='Form__footer'>* Required Fields</small>
                </Paper>
            </div>
        </div>
    );
};

export default ProfileForm;