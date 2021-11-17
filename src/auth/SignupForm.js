import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import AppAlert from "../common/AppAlert";

function SignupForm({ signup }) {
    const history = useHistory();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: ""
    });

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
            history.push("/companies");
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
            <h3 className="Form-title">Signup Form</h3>
            <form className="Form" onSubmit={handleSubmit}>

                <div className="Form-group">

                    <input
                        type="text"
                        className="Form-input"
                        placeholder="  "
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                    <label className="Form-label" htmlFor="username">Username</label>
                </div>
                <div className="Form-group">
                    <input
                        type="password"
                        className="Form-input"
                        placeholder="  "
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <label className="Form-label" htmlFor="password">Password</label>
                </div>
                <div className="Form-group">
                    <input
                        className="Form-input"
                        placeholder="  "
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                    <label className="Form-label" htmlFor="firstName">First Name</label>
                </div>
                <div className="Form-group">
                    <input
                        className="Form-input"
                        placeholder="  "
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                    <label className="Form-label" htmlFor="lastName">Last Name</label>
                </div>
                <div className="Form-group">
                    <input
                        type="email"
                        className="Form-input"
                        placeholder="  "
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <label className="Form-label" htmlFor="email">Email</label>
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
                        Register
                    </button>
                </div>

            </form>
        </div>
    );
};

export default SignupForm;

