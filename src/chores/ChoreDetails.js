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
import defaultChoreJpeg from "../assets/images/defaultChore.jpg";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

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
    const defaultChoreImage = (chore.imageCover === "defaultChore.jpg") ? defaultChoreJpeg : chore.imageCover;

    const determineStatusStyle = (status) => {
        if (status === "approved") return "approved"
        if (status === "open" || status === "rejected") return "rejected";
        if (status === "pending") return "pending";
    }

    return (
        <div className="Chore">
            <h3 className="Chore__page-title">Chore Details</h3>
            <div className="Chore__divider"></div>

            <div className="Chore__main">
                <div className="Chore__main--left">

                    <h4 className={`Chore__title Chore__title--${determineStatusStyle(chore.status)}`}>{chore.title}</h4>
                    <div className="Chore__upper-left">
                        <p className="Chore__description">{chore.description}</p>
                        <p className="Chore__footer">Chore was assigned to you by {assigner.username} (Team
                            manager) on {formatDate(chore.activity[0].date)}. Submit chore for review by
                            due date: {formatDate(chore.dueDate)}</p>
                        <div className="Chore__lower-left">
                            <div>
                                <p className="Chore__points--label">Point Value</p>
                                <p className="Chore__points">{chore.pointValue}</p>
                            </div>
                            <div>
                                <p className="Chore__due-date--label">Due Date</p>
                                <p className="Chore__due-date">{formatShortDate(chore.dueDate)}</p>
                            </div>


                        </div>
                    </div>
                </div>
                <div className="Chore__main--right">
                    <img className="Chore__image" src={defaultChoreImage} alt={defaultChoreImage} />
                </div>
            </div>

            <div className="Chore__status">
                <h3 className="Chore__page-title">Chore Status</h3>
                <div className="Chore__divider"></div>

                {chore.status === "approved" &&
                    <div className="Chore__approved-section">
                        <p>Approved</p>
                        <CheckCircleOutlineIcon sx={{ fontSize: '30px', marginLeft: '5px' }} />
                    </div>
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
            </div>

            <div className="Chore__activity">
                <h3 className="Chore__page-title">Chore Activity</h3>
                <div className="Chore__divider"></div>
                {chore.activity.map(ca => (
                    <ChoreActivity
                        key={ca._id}
                        user={ca.user}
                        event={ca.event}
                        date={ca.date}
                    />
                ))}
            </div>

            <div className="Chore__comments">
                <h3 className="Chore__page-title">Chore Comments</h3>
                <div className="Chore__divider"></div>

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
                                user={c.user}
                                comment={c.comment}
                                date={c.date}
                            />
                        )).reverse()}
                    </div>
                ) : (
                        <p>No Comments.</p>
                    )}
            </div>
        </div >
    );
};


export default ChoreDetails;