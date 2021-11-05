import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Alert from "../common/Alert"
import UserContext from "../auth/UserContext";

function CreateChoreForm({ createChore }) {
    const history = useHistory();
    const { currentUser, currentTeam, currentTeamUsers } = useContext(UserContext);
    const [formData, setFormData] = useState({
        "title": "",
        "description": "",
        "pointValue": "",
        "assigner": currentUser._id,
        "assignee": "unassigned",
        "createdBy": currentUser._id,
        "dueDate" : "",
        "status": "open",
        "imageUrl": "default-chore.jpg",
        "teamId": currentTeam._id,
        "type": "template"
    });

    console.log("Create Chore Form", currentTeamUsers)

    const [formErrors, setFormErrors] = useState([]);
    console.log(formErrors);
    console.debug(
        "CreateChoreForm",
        "createChore=", typeof createChore,
        "formData=", formData,
        "formErrors", formErrors,
    );

    async function handleSubmit(evt) {
        evt.preventDefault();
        formData.assignee = formData.assignee === "unassigned" ? null : formData.assignee;
        let result = await createChore(formData);
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
            <h3 className="Form-title">Create Chore Form</h3>
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
                        name="pointValue"
                        value={formData.pointValue}
                        onChange={handleChange}
                        required
                    />
                    <label className="Form-label" htmlFor="pointValue">Point Value</label>
                </div>
                <div className="Form-group">
                    <select name="assignee" value={formData.assignee} onChange={handleChange}>
                     <option key={"unassigned"} value="unassigned" >Unassigned</option>
                    {currentTeamUsers.map(u => (
                        <option key={u._id} value={u._id} >{u.username}</option>
                    ))}
   
                    </select>
                    <label className="Form-label" htmlFor="assignee">Assign To</label>
                </div>
                <div className="Form-group">
                   <input 
                        className="Form-input"
                        placeholder="  "
                        type="datetime-local"
                        name="dueDate"
                        value={formData.dueDate}
                        onChange={handleChange}
                        required
                   />
                    <label className="Form-label" htmlFor="dueDate">Due Date</label>
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
                        Create Chore
                    </button>
                </div>

            </form>
        </div>
    );
};

export default CreateChoreForm;