import React, { useState, useEffect, useContext } from "react";
import ChoresApi from "../api/api";
import ChoreCard from "./ChoreCard";
import LoadingSpinner from "../common/LoadingSpinner";
import UserContext from "../auth/UserContext";

function MyChoresList({ status }) {
  console.debug("MyChoresList");
  const [chores, setChores] = useState(null);
  const { currentUser } = useContext(UserContext);

  async function getChores() {
    let chores = await ChoresApi.getCurrentUserChores(currentUser._id);
    
    let filteredChores;
    if(status === "need-to-do") {
      filteredChores = chores.filter(chore => chore.status === "open" || chore.status === "rejected");
    } else {
      filteredChores = chores.filter(chore => chore.status === status);
    }
    setChores(filteredChores)
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
        <div className="">
          {chores.map(c => (
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
          ))}
        </div>
      ) : (
          <p>Nothing to do right now!</p>
        )}
    </div>
  );
};

export default MyChoresList;