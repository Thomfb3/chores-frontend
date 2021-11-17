import React, { useContext } from "react";
import TeamUserCard from "./TeamUserCard"
import LoadingSpinner from "../common/LoadingSpinner";
import UserContext from "../auth/UserContext";

function TeamUserList() {
  console.debug("TeamUserList");
  const { currentUser, currentTeamUsers } = useContext(UserContext);

  if (!currentTeamUsers) return <LoadingSpinner />;

  currentTeamUsers.sort((a, b) => (a.points < b.points && 1) || -1)

  return (
    <div>
      {currentTeamUsers.length ? (
        <div >
          {currentTeamUsers.map((u,idx)=> (
            <TeamUserCard
                id={u._id}
                key={u._id}
                isCurrentUser={u.username === currentUser.username}
                profileImage={u.profileImage}
                username={u.username}
                firstName={u.firstName}
                isAdmin={u.role === "admin"}
                points={u.points}
                position={idx+1}
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