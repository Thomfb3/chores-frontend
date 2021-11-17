import React, { useState, useContext } from "react";
import ChoresApi from "../api/api";
import UserContext from "../auth/UserContext";
import AppAlert from "../common/AppAlert";



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
        }
        setFormData(f => ({ ...f, password: "" }));
        setFormErrors([]);
        setCurrentUser(updatedUser);
    }

    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData(f => ({ ...f, [name]: value }));
        setFormErrors([]);
    };


    return (
        <div className="Form-container">
        <h3 className="Form-title">Edit Profile</h3>
            <form className="Form" onSubmit={handleSubmit}>
                <div className="Form-group">

                    <input
                        className="Form-input"
                        placeholder="  "
                        name="firstName"
                        type="text"
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
                        type="text"
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                    <label className="Form-label" htmlFor="lastName">Last Name</label>
                </div>
                <div className="Form-group">
                    <input
                        className="Form-input"
                        placeholder="  "
                        name="profileImage"
                        type="text"
                        value={formData.profileImage}
                        onChange={handleChange}
                        required
                    />
                    <label className="Form-label" htmlFor="profileImage">Profile Image</label>
                </div>

                <div className="Form-group">
                    <input
                        className="Form-input"
                        placeholder="  "
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <label className="Form-label" htmlFor="password">Enter Password</label>
                </div>

                {formErrors.length
                    ? <AppAlert severity="error" messages={formErrors} />
                    : null}


                {saveConfirmed
                    ?
                    <AppAlert severity="success" messages={["Updated successfully."]} />
                    : null}


                <div className="Form-group" >
                    <button className="Button" type="submit">Update Profile</button>
                </div>
            </form>
        </div>
    );
};

export default ProfileForm;