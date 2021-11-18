import React, { useState, useEffect, useContext } from "react";
import ChoresApi from "../api/api";
import ChoreCard from "./ChoreCard";
import LoadingSpinner from "../common/LoadingSpinner";
import UserContext from "../auth/UserContext";

function UnclaimedChoresList() {
  console.debug("UnclaimedChoresList");
  const [chores, setChores] = useState(null);
  const { currentUser, currentTeamUsers } = useContext(UserContext);

  async function getChores() {
    let chores = await ChoresApi.getCurrentUnclaimedChores();
    setChores(chores);
  }

  useEffect(() => {
    getChores();
  }, []);

  if (!chores) return <LoadingSpinner />;
 
  return (
    <div className="ChoresUnclaimed">
      <div className="ChoresUnclaimed__title">
        <h3 className="ChoresUnclaimed__list-title">Unclaimed Chores</h3>
        <div className="ChoresUnclaimed__divider"></div>
      </div>
      {chores.length ? (
        <div className="ChoreList">
          {chores.map(c => (
            <ChoreCard
                id={c._id}
                key={c._id}
                title={c.title}
                description={c.description}
                points={c.pointValue}
                status={c.status}
                assigneeName={null}
                assigneeImage={null}
                choreImage={c.choreImage}
                assignerId={c.assigner}
                assignee={c.assignee}
                createdAt={c.createdAt}
                createdBy={c.createdBy}
                currentUser={c.username === currentUser.username}
                dueDate={c.dueDate}
                cardType={"UnclaimedChoresList"}
            />
          )).reverse()}
        </div>
      ) : (
          <p>No Chores found!</p>
        )}
    </div>
  );
};

export default UnclaimedChoresList;