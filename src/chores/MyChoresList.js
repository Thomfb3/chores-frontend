import React, { useState, useEffect, useContext } from "react";
import ChoresApi from "../api/api";
import ChoreCard from "./ChoreCard";
import LoadingSpinner from "../common/LoadingSpinner";
import UserContext from "../auth/UserContext";
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import { determineMessage, determineListHeader } from "../helpers/choreHelpers";

function MyChoresList() {
  console.debug("MyChoresList");
  const [needToDoChores, setNeedToDoChores] = useState(null);
  const [pendingChores, setPendingChores] = useState(null);
  const [approvedChores, setApprovedChores] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const { currentUser } = useContext(UserContext);

  async function getChores() {
    let chores = await ChoresApi.getCurrentUserChores(currentUser._id);
    setNeedToDoChores(chores.filter(chore =>
      chore.status === "open" ||
      chore.status === "rejected" ||
      chore.status === "created"))
    setPendingChores(chores.filter(chore => chore.status === "pending"));
    setApprovedChores(chores.filter(chore => chore.status === "approved"));
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
          <div className="">
            {needToDoChores.map(c => (
              <ChoreCard
                id={c._id}
                key={c._id}
                title={c.title}
                description={c.description}
                points={c.pointValue}
                status={c.status}
                assigneeImage={c.assignee.profileImage}
                choreImage={c.choreImage}
                assignerId={c.assigner}
                assignee={c.assignee}
                createdAt={c.createdAt}
                createdBy={c.createdBy}
                currentUser={c.username === currentUser.username}
                dueDate={c.dueDate}
                cardType={"MyChoreList"}
              />
            )).reverse()}
          </div>
        ) : (
            <div className={`ChoreList__empty ChoreList__empty--need-to-do`}>
              <SentimentVerySatisfiedIcon />
              <p>{determineMessage("need-to-do")}</p>
            </div>
          )}
      </div>

      <div className="ChoreList">
        {determineListHeader("pending")}
        {pendingChores.length ? (
          <div className="">
            {pendingChores.map(c => (
              <ChoreCard
                id={c._id}
                key={c._id}
                title={c.title}
                description={c.description}
                points={c.pointValue}
                status={c.status}
                assigneeImage={c.assignee.profileImage}
                choreImage={c.choreImage}
                assignerId={c.assigner}
                assignee={c.assignee}
                createdAt={c.createdAt}
                createdBy={c.createdBy}
                currentUser={c.username === currentUser.username}
                dueDate={c.dueDate}
                cardType={"MyChoreList"}
              />
            )).reverse()}
          </div>
        ) : (
            <div className={`ChoreList__empty ChoreList__empty--pending`}>
              <SentimentVerySatisfiedIcon />
              <p>{determineMessage("pending")}</p>
            </div>
          )}
      </div>

      <div className="ChoreList">
        {determineListHeader("approved")}
        {approvedChores.length ? (
          <div className="">
            {approvedChores.map(c => (
              <ChoreCard
                id={c._id}
                key={c._id}
                title={c.title}
                description={c.description}
                points={c.pointValue}
                status={c.status}
                assigneeImage={c.assignee.profileImage}
                choreImage={c.choreImage}
                assignerId={c.assigner}
                assignee={c.assignee}
                createdAt={c.createdAt}
                createdBy={c.createdBy}
                currentUser={c.username === currentUser.username}
                dueDate={c.dueDate}
                cardType={"MyChoreList"}
              />
            )).reverse()}
          </div>
        ) : (
            <div className={`ChoreList__empty ChoreList__empty--approved`}>
              <SentimentVerySatisfiedIcon />
              <p>{determineMessage("approved")}</p>
            </div>
          )}
      </div>

    </div>
  );
};

export default MyChoresList;