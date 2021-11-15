import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Alert from "../common/Alert"
import UserContext from "../auth/UserContext";
import ChoreCommentContext from "./ChoreCommentContext";

function ChoreCommentForm({ postChoreComment }) {
    const history = useHistory();
    const { currentChoreComments, setCurrentChoreComments } = useContext(ChoreCommentContext);
    
    const { currentUser } = useContext(UserContext);
    const [formData, setFormData] = useState({
        user: currentUser._id,
        comment: ""
    });
    
    const [formErrors, setFormErrors] = useState([]);
    console.log(formErrors);
    console.debug(
        "ChoreCommentForm",
        "postChoreComment=", typeof postChoreComment,
        "formData=", formData,
        "formErrors", formErrors,
    );

    async function handleSubmit(evt) {
        evt.preventDefault();
        let result = await postChoreComment(formData);

        if (result.success) {
            console.log("RESULT DATA", result)
            console.log("currentChoreComments", currentChoreComments)
            setCurrentChoreComments([...currentChoreComments, result.newChoreComment.data])
            
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
            
            <form className="Form" onSubmit={handleSubmit}>
                <div className="Form-group">
                    <textarea 
                        className="Form-input ChoreComment__input"
                        placeholder="Add a comment..."
                        name="comment"
                        type="textarea"
                        value={formData.comment}
                        onChange={handleChange}
                        cols={100}
                        rows={6}
                        required
                    ></textarea>
                  
                </div>

                {formErrors.length
                    ? <Alert type="danger" messages={formErrors} />
                    : null}
                
                <div className="Form-group"> 
                    <button
                        className="Button ChoreComment__button"
                        type="submit"
                        onSubmit={handleSubmit}
                    >
                        Post Comment
                    </button>
                </div>

            </form>
        </div>
    );
};

export default ChoreCommentForm;