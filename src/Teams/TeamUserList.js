import React, { useContext } from "react";
import TeamUserCard from "./TeamUserCard";
import LoadingSpinner from "../common/LoadingSpinner";
import UserContext from "../auth/UserContext";

function TeamUserList() {
  console.debug("TeamUserList");
  const { currentUser, currentTeamUsers } = useContext(UserContext);

  if (!currentTeamUsers) return <LoadingSpinner />;
  
  return (
    <div>

      {currentTeamUsers.length ? (
        <div >
          {currentTeamUsers.map(u => (
            <TeamUserCard
                id={u._id}
                key={u._id}
                isCurrentUser={u.username === currentUser.username}
                profileImage={u.profileImage}
                username={u.username}
                firstName={u.firstName}
                isAdmin={u.role === "admin"}
                points={u.points}
            />
          ))}
        </div>
      ) : (
          <p>No Chores found!</p>
        )}
    </div>
  );
};

export default TeamUserList;