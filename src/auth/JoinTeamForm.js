import React, { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import AppAlert from "../common/AppAlert"
import UserContext from "../auth/UserContext";
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

function JoinTeamForm({ joinTeam }) {
    const history = useHistory();
    const { currentUser } = useContext(UserContext);
    const [formData, setFormData] = useState({
        teamName: "",
        teamPassword: "",
        username: currentUser.username
    });

    const [formErrors, setFormErrors] = useState([]);
    console.log(formErrors);
    console.debug(
        "JoinTeamForm",
        "joinTeam=", typeof joinTeam,
        "formData=", formData,
        "formErrors", formErrors,
    );

    const [values, setValues] = useState({
        showPassword: false
    });

    const [loading, setLoading] = useState(false);

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
        setLoading(true);
        let result = await joinTeam(formData);

        if (result.success) {
            history.push("/");
        } else {
            setFormErrors(result.errors);
            setLoading(false);
        };
    };

    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData(data => ({ ...data, [name]: value }));
    };

    function reset() {
        setFormErrors([]);
     };

    return (
        <div className="Form-container">
            <Paper
                elevation={3}
                sx={{
                        width: '50%', paddingTop: '30px', margin: 'auto', marginTop: '50px', paddingBottom: '10px',
                        '@media (max-width:900px)': {
                            width: '90%'
                        }
                    }}>
                <form className="Form" onSubmit={handleSubmit}>
                    <div className="Form__box-title">Join Team</div>
                    <div className="Form-group">
                        <TextField
                            id="teamName"
                            label="Team Name"
                            className="Form-input"
                            variant="outlined"
                            sx={{ m: 1, width: '95%' }}
                            className="Form-input"
                            placeholder="  "
                            name="teamName"
                            type="text"
                            value={formData.teamName}
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
                            name="teamPassword"
                            required
                            value={formData.teamPassword}
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
                        ? <AppAlert severity="error" messages={formErrors} reset={reset} resetNeeded={true} />
                        : null}

                    <div className="Form-group" style={{ textAlign: 'right' }}>
                        <LoadingButton
                            sx={{ m: 2, backgroundColor: '#1193ff', borderRadius: '5px' }}
                            variant="contained"
                            type="submit"
                            loading={loading}
                            onSubmit={handleSubmit}
                        >
                            Join Team
                        </LoadingButton>
                    </div>
                </form>
                <small className='Form__footer'>* Required Fields</small>
            </Paper>
            <div className='Form__after'>
                <p>Don't have a team to join?</p>
                <Link to="/create-team" style={{textDecoration:"none"}}>
                    <Button
                        sx={{ m: 2, backgroundColor: '#F98200', borderRadius: '5px', textDecoration: "none",
                            '&:hover': {
                                backgroundColor: '#f95c00'
                            },}}
                        variant="contained"
                    >
                        Create Team
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default JoinTeamForm;