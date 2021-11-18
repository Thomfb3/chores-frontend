import React, { useState, useEffect, useContext } from "react";
import ChoresApi from "../api/api";
import RewardCard from "./RewardCard";
import LoadingSpinner from "../common/LoadingSpinner";

function RewardList() {
  console.debug("RewardList");
  const [rewards, setRewards] = useState(null);

  async function getRewards() {
    let rewards = await ChoresApi.getTeamRewards();

    let availableRewards = rewards.data.filter(reward => reward.status === "open");
    setRewards(availableRewards);
  }

  useEffect(() => {
    getRewards();
  }, []);

  if (!rewards) return <LoadingSpinner />;

  return (
    <div className="RewardList">
      <div className="RewardList__title">
        <h3 className="RewardList__list-title">Rewards</h3>
        <div className="RewardList__divider"></div>
      </div>
      {rewards.length ? (
        <div >
          {rewards.map(c => (
            <RewardCard
              id={c._id}
              key={c._id}
              title={c.title}
              description={c.description}
              points={c.pointsNeeded}
              status={c.status}
              rewardImage={c.rewardImage}
              sponsor={c.sponsor}
              createdAt={c.activity[0].date}
              createdBy={c.activity[0].user}
            />
          ))}
        </div>
      ) : (
          <p>No Rewards available!</p>
        )}
    </div>
  );
};

export default RewardList;