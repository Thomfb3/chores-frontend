import React, { useState, useEffect, useContext } from "react";
import ChoresApi from "../api/api";
import ChoreCard from "./ChoreCard";
import LoadingSpinner from "../common/LoadingSpinner";
import UserContext from "../auth/UserContext";

function TeamChoresList() {
  console.debug("TeamChoresList");
  const [chores, setChores] = useState(null);
  const { currentUser, currentTeamUsers } = useContext(UserContext);

  async function getChores() {
    let chores = await ChoresApi.getTeamChores();
    let assignedChores = chores.chores.filter(chore => chore.assignee !== null);
    setChores(assignedChores);
  }

  useEffect(() => {
    getChores();
  }, []);

  if (!chores) return <LoadingSpinner />;

  return (
    <div className="ChoreList">
      {chores.length ? (
        <div >
          {chores.map(c => (
            <ChoreCard
                id={c._id}
                key={c._id}
                title={c.title}
                description={c.description}
                points={c.pointValue}
                status={c.status}
                assigneeName={c.assignee.firstName}
                assigneeImage={c.assignee.profileImage}
                choreImage={c.choreImage}
                assignerId={c.assigner}
                assignee={c.assignee}
                createdAt={c.createdAt}
                createdBy={c.createdBy}
                currentUser={c.username === currentUser.username}
                dueDate={c.dueDate}
                cardType={"TeamChoresList"}
            />
          ))}
        </div>
      ) : (
          <p>No Chores found!</p>
        )}
    </div>
  );
};

export default TeamChoresList;