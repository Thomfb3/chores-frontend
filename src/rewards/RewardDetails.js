import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import ChoresApi from "../api/api";
import findUserInTeam from "../helpers/findUserInTeam";
import formatDate from "../helpers/formatDate";
import LoadingSpinner from "../common/LoadingSpinner";
import UserContext from "../auth/UserContext";

function RewardDetails() {
    const { id } = useParams();
    console.debug("Reward Details", "id=", id);
    const [reward, setReward] = useState(null);
    const { currentUser, currentTeamUsers } = useContext(UserContext);

    async function getReward() {
        let reward = await ChoresApi.getReward(id);
        setReward(reward);
    };

    useEffect(() => {
        getReward();
    }, []);

    if (!reward) return <LoadingSpinner />;

    const createdBy = findUserInTeam(reward.createdBy, currentTeamUsers);
    const sponsor = findUserInTeam(reward.sponsor, currentTeamUsers);

    return (
        <div className="">
            <div>
                <h3 className="">{reward.title}</h3>
                <p className="">{reward.description}</p>
                <h3 className="">Sponsored by: {sponsor.username}</h3>

                <p>This reward was created by {createdBy.username} (Team
                    manager) on {formatDate(reward.activity[0].date)}.</p>
            </div>
        </div>  
    );
};

export default RewardDetails;