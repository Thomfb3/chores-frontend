import React, { useContext } from "react";
import TeamUserCard from "./TeamUserCard"
import LoadingSpinner from "../common/LoadingSpinner";
import UserContext from "../auth/UserContext";


function TeamUserList() {
  console.debug("TeamUserList");
  const { currentUser, currentTeam, currentTeamUsers } = useContext(UserContext);

  if (!currentTeamUsers) return <LoadingSpinner />;
  currentTeamUsers.sort((a, b) => (a.points < b.points && 1) || -1);

  return (
    <div className="TeamUserList">
      <div className="TeamUserList__title">
        <h3 className="TeamUserList__list-title">Team {currentTeam.name}</h3>
        <div className="TeamUserList__divider"></div>
      </div>
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
                currentPoints={u.currentPoints}
                allTimePoints={u.allTimePoints}
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