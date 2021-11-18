import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import AppAlert from "../common/AppAlert";
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

function SignupForm({ signup }) {
    const history = useHistory();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: ""
    });

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

    const [formErrors, setFormErrors] = useState([]);
    console.debug(
        "SignupForm",
        "signup=", typeof signup,
        "formData=", formData,
        "formErrors", formErrors,
    );

    async function handleSubmit(evt) {
        evt.preventDefault();
        let result = await signup(formData);
        if (result.success) {
            history.push("/");
        } else {
            setFormErrors(result.errors);
        };
    };

    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData(data => ({ ...data, [name]: value }));
    };

    return (
        <div className="Form">
            <Paper
                elevation={3}
                sx={{ width: '50%', paddingTop: '30px', margin: 'auto', marginTop: '50px', paddingBottom: '10px' }}>
                <form className="Form" onSubmit={handleSubmit}>
                    <div className="Form__box-title">Sign Up</div>
                    <div className="Form-group">
                        <TextField
                            id="username"
                            label="Username"
                            variant="outlined"
                            sx={{ m: 1, width: '95%' }}
                            type="text"
                            className="Form-input"
                            placeholder="  "
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
        
                    <FormControl sx={{ m: 1, width: '95%' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="password"
                            label="Password"
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
         
                    <div className="Form-group">
                        <TextField
                            id="firstName"
                            label="First Name"
                            variant="outlined"
                            sx={{ m: 1, width: '95%' }}
                            className="Form-input"
                            placeholder="  "
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="Form-group">
                        <TextField
                            id="lastName"
                            label="Last Name"
                            variant="outlined"
                            sx={{ m: 1, width: '95%' }}
                            className="Form-input"
                            placeholder="  "
                            name="lastName"
                            type="text"
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="Form-group">
                        <TextField
                            id="email"
                            label="Email"
                            variant="outlined"
                            sx={{ m: 1, width: '95%' }}
                            type="email"
                            className="Form-input"
                            placeholder="  "
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {formErrors.length
                        ? <AppAlert severity="error" messages={formErrors} />
                        : null}

                    <div className="Form-group" style={{ textAlign: 'right' }}>
                        <Button
                            sx={{ m: 2, backgroundColor: '#1193ff', borderRadius: '5px' }}
                            variant="contained"
                            type="submit"
                            onSubmit={handleSubmit}
                        >
                            Sign Up
                        </Button>
                    </div>

                </form>
                <small className='Form__footer'>* Required Fields</small>
            </Paper>
        </div>
    );
};

export default SignupForm;

