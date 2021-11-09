import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Alert from "../common/Alert"
import UserContext from "../auth/UserContext";

function CreateRewardForm({ createReward }) {
    const history = useHistory();
    const { currentUser, currentTeam, currentTeamUsers } = useContext(UserContext);
    const [formData, setFormData] = useState({
        "title": "",
        "description": "",
        "pointsNeeded": "",
        "sponsor": currentUser._id,
        "createdBy": currentUser._id,
        "status": "open",
        "imageUrl": "default-reward.jpg",
        "teamId": currentTeam._id,
        "type": "template",
        "activity": [
            {
            "user": currentUser._id,
            "event": "Reward created"
            }
        ]
    });

    console.log("Create Reward Form", currentTeamUsers)

    const [formErrors, setFormErrors] = useState([]);
    console.log(formErrors);
    console.debug(
        "CreateRewardForm",
        "createReward=", typeof createReward,
        "formData=", formData,
        "formErrors", formErrors,
    );

    async function handleSubmit(evt) {
        evt.preventDefault();

        let result = await createReward(formData);
        if (result.success) {
            history.push("/rewards");
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
            <h3 className="Form-title">Create Reward Form</h3>
            <form className="Form" onSubmit={handleSubmit}>
                <div className="Form-group">
                    <input
                        className="Form-input"
                        placeholder="  "
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                    <label className="Form-label" htmlFor="title">Title</label>
                </div>
                <div className="Form-group">
                    <input
                        className="Form-input"
                        placeholder="  "
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                    <label className="Form-label" htmlFor="description">Description</label>
                </div>
                <div className="Form-group">
                    <input
                        className="Form-input"
                        placeholder="  "
                        type="number"
                        name="pointsNeeded"
                        value={formData.pointsNeeded}
                        onChange={handleChange}
                        required
                    />
                    <label className="Form-label" htmlFor="pointsNeeded">Points Needed</label>
                </div>

                {formErrors.length
                    ? <Alert type="danger" messages={formErrors} />
                    : null}

                <div className="Form-group">
                    <button
                        className="Button"
                        type="submit"
                        onSubmit={handleSubmit}
                    >
                        Create Reward
                    </button>
                </div>

            </form>
        </div>
    );
};

export default CreateRewardForm;
