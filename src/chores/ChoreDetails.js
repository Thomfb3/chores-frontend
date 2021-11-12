import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import ChoresApi from "../api/api";
import ChoreActivity from "./ChoreActivity";
import ChoreComment from "../comments/ChoreComment";
import ChoreCommentForm from "../comments/ChoreCommentForm";
import findUserInTeam from "../helpers/findUserInTeam";
import setChoreStatusButton from "../helpers/setChoreStatus"
import { formatDate, formatShortDate, formatDay } from "../helpers/formatDate";
import LoadingSpinner from "../common/LoadingSpinner";
import UserContext from "../auth/UserContext";
import ChoreCommentContext from "../comments/ChoreCommentContext";
import SubmitChoreForm from "./SubmitChoreForm";
//import ReviewChoreForm from "./ReviewChoreForm";

function ChoreDetails() {
    const { id } = useParams();
    console.debug("ChoreDetails", "id=", id);
    const [chore, setChore] = useState(null);
    const [choreComments, setChoreComments] = useState([]);
    const { currentUser, currentTeamUsers } = useContext(UserContext);
    const { currentChoreComments, setCurrentChoreComments } = useContext(ChoreCommentContext);

    async function getChore() {
        let chore = await ChoresApi.getChore(id);
        setChore(chore);
    };

    async function getChoreComments() {
        let choreComments = await ChoresApi.getChoreComments(id);
        setCurrentChoreComments(choreComments.data)
    };

    async function postChoreComment(choreCommentData) {
        try {
            let newChoreComment = await ChoresApi.postChoreComment(id, choreCommentData);
            return { success: true, newChoreComment };
        } catch (errors) {
            console.error("Failed to create team", errors)
            return { success: false, errors };
        };
    };

    async function submitChore(submitChoreData) {
        try {
            let updatedChore = await ChoresApi.updateChoreStatus(id, submitChoreData);
            return { success: true, updatedChore };
        } catch (errors) {
            console.error("Failed to create team", errors)
            return { success: false, errors };
        };
    };

    useEffect(() => {
        getChore();
        getChoreComments();
    }, []);

    if (!chore) return <LoadingSpinner />;

    const assignee = findUserInTeam(chore.assigner, currentTeamUsers);
    const assigner = findUserInTeam(chore.assigner, currentTeamUsers);
    const newChoreStatus = setChoreStatusButton(chore.status)

    return (
        <div className="">
            <div>
                <h4 className="">{chore.title}</h4>
                <p className="">{chore.description}</p>
                <p>Chore was assigned to you by {assigner.username} (Team
                    manager) on {formatDate(chore.activity[0].date)}. Submit chore for review by
                    due date: {formatDate(chore.dueDate)}</p>
                <p className="">{assigner.username}</p>
                <p className="">{assignee.username}</p>
                <p className="">{formatDate(chore.dueDate)}</p>
                <p className="">{chore.status}</p>
                <img src={chore.imageCover} alt={chore.imageCover} />
            </div>
            <div>
            {chore.status === "approved" &&
                    <div>Chore Completed.</div>
                }

            {chore.status !== "approved" &&
                    <SubmitChoreForm
                        status={chore.status}
                        statusButton={newChoreStatus}
                        submitChore={submitChore}
                        isAssigner={currentUser._id === assigner._id}
                        isAssignee={currentUser._id === assignee._id}
                    />
            }
                <h4>Chore Activity</h4>
                {chore.activity.map(ca => (
                    <ChoreActivity
                        key={ca._id}
                        user={ca.user}
                        event={ca.event}
                        date={ca.date}
                    />
                ))}
            </div>
            <div>
                <ChoreCommentForm
                    postChoreComment={postChoreComment}
                    choreCommentList={choreComments}
                />
                {currentChoreComments.length ? (
                    <div>
                        {currentChoreComments.map(c => (
                            <ChoreComment
                                id={c._id}
                                key={c._id}
                                comment={c.comment}
                                date={c.date}
                            />
                        )).reverse()}
                    </div>
                ) : (
                        <p>No Comments.</p>
                    )}
            </div>
        </div>
    );
};


export default ChoreDetails;