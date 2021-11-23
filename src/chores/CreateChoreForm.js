import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import AppAlert from "../common/AppAlert"
import UserContext from "../auth/UserContext";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';


function CreateChoreForm({ createChore }) {
    const history = useHistory();
    const { currentUser, currentTeam, currentTeamUsers } = useContext(UserContext);
    const [dueDateValue, setDueDateValue] = useState(new Date());
    const [formData, setFormData] = useState({
        "title": "",
        "description": "",
        "pointValue": "",
        "assigner": currentUser._id,
        "assignee": "unassigned",
        "createdBy": currentUser._id,
        "dueDate": "",
        "status": "created",
        "imageCover": "default-chore.jpg",
        "teamId": currentTeam._id,
        "type": "template"
    });

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
        formData.imageCover = (formData.imageCover=== "") ? "default-chore.jpg" : formData.imageUrl;
        formData.assignee = formData.assignee === "unassigned" ? null : formData.assignee;
        let result = await createChore(formData);
        if (result.success) {
            history.push("/chores");
        } else {
            setFormErrors(result.errors);
        };
    };

    function handleChange(evt) {
        formData.dueDate = dueDateValue;
        const { name, value } = evt.target;
        setFormData(data => ({ ...data, [name]: value }));
    };

    return (
        <div className="Form">
            <div className="Form__title">
                <div className="Form__list-title">Manage Chores</div>
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
                        <div className="Form__box-title">Create New Chore</div>
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
                                id="pointValue"
                                label="Point Value"
                                variant="outlined"
                                placeholder="  "
                                type="number"
                                name="pointValue"
                                value={formData.pointValue}
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

                        <FormControl sx={{ m: 1, width: '95%' }}>
                            <InputLabel id="assignee" sx={{ backgroundColor: 'white', padding: '3px' }}>Assign To</InputLabel>
                            <Select
                                labelId="assignee"
                                id="assignee-select"
                                value={formData.assignee}
                                name="assignee"
                                onChange={handleChange}
                            >
                                <MenuItem key={"unassigned"} value={"unassigned"}>Unassigned</MenuItem>
                                {currentTeamUsers.map(u => (
                                    <MenuItem key={u._id} value={u._id}>{u.username}</MenuItem>

                                ))}
                            </Select>
                        </FormControl>

                        <LocalizationProvider name="dueDate" dateAdapter={AdapterDateFns}>
                            <DateTimePicker
                                renderInput={(props) => <TextField {...props} sx={{ m: 1, width: '95%' }} />}
                                type="datetime-local"
                                name="dueDate"
                                label="Due Date"
                                value={dueDateValue}
                                onChange={(newDueDateValue) => {
                                    setDueDateValue(newDueDateValue);
                                }}
                            />
                        </LocalizationProvider>

                        {formErrors.length
                            ? <AppAlert severity="error" messages={formErrors} />
                            : null}

                        <div className="Form-group">
                            <Button
                                sx={{ m: 1, backgroundColor: '#1193ff', borderRadius: '5px' }}
                                variant="contained"
                                type="submit"
                                onSubmit={handleSubmit}
                            >
                                Create Chore
                            </Button>
                        </div>
                    </form>
                </Paper>
            </div>
        </div>
    );
};

export default CreateChoreForm;