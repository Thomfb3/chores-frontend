import React, { useState, useEffect, useContext } from "react";
import ChoresApi from "../api/api";
import ChoreCard from "./ChoreCard";
import LoadingSpinner from "../common/LoadingSpinner";
import UserContext from "../auth/UserContext";


function MyChoresList() {
  console.debug("MyChoresList");
  const [chores, setChores] = useState(null);
  const { currentUser } = useContext(UserContext);

  async function getChores() {
    let chores = await ChoresApi.getCurrentUserChores(currentUser._id);
    setChores(chores);
  }

  useEffect(() => {
    getChores();
  }, []);

  if (!chores) return <LoadingSpinner />;
  
  return (
    <div>

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
                assigner={c.assigner}
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
          <p>No Chores found!</p>
        )}
    </div>
  );
};

export default MyChoresList;