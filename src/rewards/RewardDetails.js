import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import ChoresApi from "../api/api";
import findUserInTeam from "../helpers/findUserInTeam";
import { formatDate } from "../helpers/formatDate";
import LoadingSpinner from "../common/LoadingSpinner";
import UserContext from "../auth/UserContext";
import defaultRewardImage from "../assets/images/defaultChore.jpg";
import ClaimRewardForm from "./ClaimRewardForm";


function RewardDetails() {
    const { id } = useParams();
    console.debug("Reward Details", "id=", id);
    const [reward, setReward] = useState(null);
    const { currentTeamUsers } = useContext(UserContext);

    async function getReward() {
        let reward = await ChoresApi.getReward(id);
        setReward(reward);
    };

    async function claimReward(claimRewardData) {
        try {
            let updatedReward = await ChoresApi.updateRewardStatus(id, claimRewardData);
            return { success: true, updatedReward };
        } catch (errors) {
            console.error("Failed to claim reward", errors)
            return { success: false, errors };
        };
    };

    async function subtractUserPoints(userId, userPointsData) {
        try {
            let updatedUser = await ChoresApi.updateUserPoints(userId, userPointsData);
            return { success: true, updatedUser };
        } catch (errors) {
            console.error("Failed to update user points", errors)
            return { success: false, errors };
        };
    };

    useEffect(() => {
        getReward();
    }, []);

    if (!reward) return <LoadingSpinner />;

    const createdBy = findUserInTeam(reward.createdBy, currentTeamUsers);
    const sponsor = findUserInTeam(reward.sponsor, currentTeamUsers);

    return (
        <div className="Reward">
            <h3 className="Reward__page-title">Reward Details</h3>
            <div className="Reward__divider"></div>
            <div className="Reward__main">
                <div className="Reward__main--left">

                    <h4 className={`Reward__title`}>{reward.title}</h4>
                    <div className="Reward__upper-left">
                        <p className="Reward__description">{reward.description}</p>
                        <p className="Reward__footer">This reward was created by {createdBy.username} (Team
                    manager) on {formatDate(reward.activity[0].date)}.</p>

                        <div className="Reward__lower-left">
                            <div>
                                <p className="Reward__points--label">Points Needed</p>
                                <p className="Reward__points">{reward.pointsNeeded}</p>
                            </div>
                            <div>
                                <p className="Reward__due-date--label">Sponsored By:</p>
                                <p className="Reward__due-date">{sponsor.username}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="Reward__main--right">
                    <img className="Reward__image" src={defaultRewardImage} alt={defaultRewardImage} />
                </div>
            </div>
            <div className="Reward__status">
                <h3 className="Chore__page-title">Chore Status</h3>
                <div className="Chore__divider"></div>
                {reward.status === "open" ? "Available" : reward.status}
                <ClaimRewardForm
                    rewardId={id}
                    claimReward={claimReward}
                    subtractUserPoints={subtractUserPoints}
                    points={reward.pointsNeeded}
                />
            </div>
        </div>
    );
};

export default RewardDetails;