import React, { useState, useEffect, useContext } from "react";
import ChoresApi from "../api/api";
import ChoreCard from "./ChoreCard";
import LoadingSpinner from "../common/LoadingSpinner";
import UserContext from "../auth/UserContext";
import { determineMessage, determineListHeader } from "../helpers/choreHelpers";

function TeamChoresList() {
  console.debug("TeamChoresList");
  const [needToDoChores, setNeedToDoChores] = useState(null);
  const [pendingChores, setPendingChores] = useState(null);
  const [approvedChores, setApprovedChores] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const { currentUser, currentTeam } = useContext(UserContext);

  async function getChores() {
    let chores = await ChoresApi.getTeamChores(currentTeam._id);
    let assignedChores = chores.chores.filter(chore => chore.assignee !== null);

    setNeedToDoChores(assignedChores.filter(chore =>
      chore.status === "open" ||
      chore.status === "rejected" ||
      chore.status === "created"))
    setPendingChores(assignedChores.filter(chore => chore.status === "pending"));
    setApprovedChores(assignedChores.filter(chore => chore.status === "approved"));
    setIsLoaded(true)
  }

  useEffect(() => {
    getChores();
  }, []);

  if (!isLoaded) return <LoadingSpinner />;

  return (
    <div>
      <div className="ChoreList">
        {determineListHeader("need-to-do")}
        {needToDoChores.length ? (
          <div >
            {needToDoChores.map(c => (
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
            <div className={`ChoreList__empty ChoreList__empty--need-to-do`}>
              <p>{determineMessage("need-to-do")}</p>
            </div>
          )}
      </div>

      <div className="ChoreList">
        {determineListHeader("pending")}
        {pendingChores.length ? (
          <div >
            {pendingChores.map(c => (
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
            <div className={`ChoreList__empty ChoreList__empty--pending`}>
              <p>{determineMessage("pending")}</p>
            </div>
          )}
      </div>

      <div className="ChoreList">
        {determineListHeader("approved")}
        {approvedChores.length ? (
          <div >
            {approvedChores.map(c => (
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
            <div className={`ChoreList__empty ChoreList__empty--approved`}>
              <p>{determineMessage("approved")}</p>
            </div>
          )}
      </div>

    </div>
  );
};

export default TeamChoresList;