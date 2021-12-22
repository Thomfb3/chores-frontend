import React, { useContext, useState } from "react";
import TeamUserCard from "./TeamUserCard"
import LoadingSpinner from "../common/LoadingSpinner";
import UserContext from "../auth/UserContext";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

function TeamUserList() {
  console.debug("TeamUserList");
  const { currentUser, currentTeam, currentTeamUsers } = useContext(UserContext);
  const [pointsView, setPointsView] = useState("all");

  if(pointsView === "all") {
    currentTeamUsers.sort((a, b) => (a.allTimePoints < b.allTimePoints && 1) || -1);
  }

  if (!currentTeamUsers) return <LoadingSpinner />;

  const togglePointView = () => {
    if(pointsView === "all") {
      setPointsView("current");
      currentTeamUsers.sort((a, b) => (a.currentPoints < b.currentPoints && 1) || -1);
    } else {
      setPointsView("all");
    }
  }

  return (
    <div className="TeamUserList">
      <div className="TeamUserList__title">
        <h3 className="TeamUserList__list-title">Team {currentTeam.name}</h3>
        <div className="TeamUserList__divider"></div>

        <div className="TeamUserList__toggle-points-view">
          <FormControlLabel
            control={
              <Switch 
                onChange={togglePointView} 
                defaultChecked 
                color="warning"/>
            } 
            label={pointsView === "all" ? "All Time Points" : "Current Points"}
            labelPlacement="top"
          />
        </div>

      </div>
      {currentTeamUsers.length ? (
        <div >
          {
            currentTeamUsers.map((u, idx) => (
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
              pointsView={pointsView}
              position={idx + 1}
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