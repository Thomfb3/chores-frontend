import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import AppAlert from "../common/AppAlert"
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import { Link } from "react-router-dom";

function LoginForm({ login }) {
    const history = useHistory();

    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);

    const [formErrors, setFormErrors] = useState([]);
    console.log(formErrors);
    console.debug(
        "LoginForm",
        "login=", typeof login,
        "formData=", formData,
        "formErrors", formErrors,
    );

    async function handleSubmit(evt) {
        evt.preventDefault();
        setLoading(true);
        let result = await login(formData);
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
        <div className="Form">
            <Paper
                elevation={3}
                sx={{
                        width: '50%', paddingTop: '30px', margin: 'auto', marginTop: '50px', paddingBottom: '10px',
                        '@media (max-width:900px)': {
                            width: '90%'
                        }
                    }}>
                <form className="Form" onSubmit={handleSubmit}>
                    <div className="Form__box-title">Login</div>
                    <div className="Form-group">
                        <TextField
                            id="username"
                            label="Username"
                            className="Form-input"
                            variant="outlined"
                            placeholder="  "
                            name="username"
                            type="text"
                            value={formData.username}
                            onChange={handleChange}
                            sx={{ m: 1, width: '95%' }}
                            required
                        />
                    </div>
                    <div className="Form-group">
                        <TextField
                            id="password"
                            label="Password"
                            className="Form-input"
                            placeholder="  "
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            sx={{ m: 1, width: '95%' }}
                            required
                        />
                    </div>

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
                            Login
                        </LoadingButton>
                    </div>
                </form>
                <small className='Form__footer'>* Required Fields</small>
            </Paper>
            <div className='Form__after'>
                <p>Don't have an account?</p>
                <Link to="/signup" style={{textDecoration:"none"}}>
                    <Button
                        sx={{ m: 2, backgroundColor: '#F98200', borderRadius: '5px', textDecoration: "none",
                            '&:hover': {
                                backgroundColor: '#f95c00'
                            },}}
                        variant="contained"
                    >
                        Signup
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default LoginForm;