import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import AppAlert from "../common/AppAlert"
import UserContext from "../auth/UserContext";
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

function CreateRewardForm({ createReward }) {
    const history = useHistory();
    const { currentUser, currentTeam } = useContext(UserContext);
    const [formData, setFormData] = useState({
        "title": "",
        "description": "",
        "pointsNeeded": "",
        "sponsor": currentUser._id,
        "createdBy": currentUser._id,
        "status": "open",
        "imageCover": "default-reward.jpg",
        "teamId": currentTeam._id,
        "type": "template",
        "activity": [
            {
                "user": currentUser._id,
                "event": "Reward created",
                "status": "created"
            }
        ]
    });

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
        <div className="Form">
            <div className="Form__title">
                <div className="Form__list-title">Manage Rewards</div>
                <div className="Form__divider"></div>
            </div>
            <div className="Form__form-container">
                <Paper
                    elevation={3}
                    sx={{ width: '50%', paddingTop: '30px', margin: 'auto', marginTop: '50px', paddingBottom: '10px' }}>
                    <form className="Form" onSubmit={handleSubmit}>
                        <div className="Form__box-title">Create New Reward</div>
                        <div className="Form-group">
                            <TextField
                                id="title"
                                label="Title"
                                variant="outlined"
                                placeholder="  "
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                sx={{ m: 1, width: '95%' }}
                                required />
                        </div>
                        <div className="Form-group">
                            <TextField
                                id="description"
                                label="Description"
                                variant="outlined"
                                placeholder="  "
                                type="text"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                sx={{ m: 1, width: '95%' }}
                            />
                        </div>
                        <div className="Form-group">
                            <TextField
                                id="pointsNeeded"
                                label="Points Needed"
                                variant="outlined"
                                placeholder="  "
                                type="number"
                                name="pointsNeeded"
                                value={formData.pointsNeeded}
                                onChange={handleChange}
                                sx={{ m: 1, width: '95%' }}
                            />
                        </div>
                        <div className="Form-group">
                            <TextField
                                id="imageCover"
                                label="Chore Image"
                                variant="outlined"
                                placeholder="  "
                                type="text"
                                name="imageCover"
                                value={formData.imageCover}
                                onChange={handleChange}
                                sx={{ m: 1, width: '95%' }}
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
                                Create Reward
                            </Button>
                        </div>
                    </form>
                    <small className='Form__footer'>* Required Fields</small>
                </Paper>
            </div>
        </div>
    );
};

export default CreateRewardForm;
