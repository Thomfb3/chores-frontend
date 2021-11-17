import React, { useState, useEffect, useContext } from "react";
import ChoresApi from "../api/api";
import ChoreCard from "./ChoreCard";
import LoadingSpinner from "../common/LoadingSpinner";
import UserContext from "../auth/UserContext";

function TeamChoresList({status}) {
  console.debug("TeamChoresList");
  const [chores, setChores] = useState(null);
  const { currentUser, currentTeamUsers } = useContext(UserContext);

  async function getChores() {
    let chores = await ChoresApi.getTeamChores();
  
    let assignedChores = chores.chores.filter(chore => chore.assignee !== null);

    let filteredChores;
    if(status === "need-to-do") {
      filteredChores = assignedChores.filter(chore => chore.status === "open" || chore.status === "rejected" || chore.status === "created");
    } else {
      filteredChores = assignedChores.filter(chore => chore.status === status);
    }

    setChores(filteredChores);
  }

  const determineMessage = (status) => {
    if (status === "need-to-do") return "Nothing to do right now.";
    if (status === "pending") return "Nothing in review.";
    if (status === "approved") return "You have no recently approved chores.";
 }

  const determineListHeader = (status) => {
    if (status === "need-to-do") {
      return (
        <div className="ChoreList__title">
          <h3 className="ChoreList__list-title ChoreList__list-title--need-to-do">Need to do</h3>
          <div className="ChoreList__divider ChoreList__divider--need-to-do"></div>
        </div>)
    }
    if (status === "pending") {
      return (
        <div className="ChoreList__title">
          <h3 className="ChoreList__list-title ChoreList__list-title--pending">Pending Review</h3>
          <div className="ChoreList__divider ChoreList__divider--pending"></div>
        </div>)
    }
    if (status === "approved") {
      return (
        <div className="ChoreList__title">
          <h3 className="ChoreList__list-title ChoreList__list-title--approved">Approved Recently</h3>
          <div className="ChoreList__divider ChoreList__divider--approved"></div>
        </div>)
    }
  }

  useEffect(() => {
    getChores();
  }, []);

  if (!chores) return <LoadingSpinner />;

  return (
    <div className="ChoreList">
    {determineListHeader(status)}
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
          )).reverse()}
        </div>
      ) : (
        <div className={`ChoreList__empty ChoreList__empty--${status}`}>
            <p>{determineMessage(status)}</p>
          </div>
        )}
    </div>
  );
};

export default TeamChoresList;