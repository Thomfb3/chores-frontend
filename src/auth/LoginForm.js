import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import AppAlert from "../common/AppAlert"


function LoginForm({ login }) {
    const history = useHistory();

    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

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
        let result = await login(formData);

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
        <div className="Form-container">
            <h3 className="Form-title">Login Form</h3>
            <form className="Form" onSubmit={handleSubmit}>
                <div className="Form-group">
                    
                    <input 
                        className="Form-input"
                        placeholder="  "
                        name="username"
                        type="text"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                    <label className="Form-label" htmlFor="username">Username</label>
                </div>

                <div className="Form-group">
                    
                    <input
                        className="Form-input"
                        placeholder="  "
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <label className="Form-label" htmlFor="password">Password</label>
                </div>

                {formErrors.length
                    ? <AppAlert severity="error" messages={formErrors} />
                    : null}

                
                <div className="Form-group"> 
                    <button
                        className="Button"
                        type="submit"
                        onSubmit={handleSubmit}
                    >
                        Login
                    </button>
                </div>

            </form>
        </div>
    );
};

export default LoginForm;