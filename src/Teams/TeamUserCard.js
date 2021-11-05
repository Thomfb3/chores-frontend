import React from "react";
import { Link } from "react-router-dom";

function TeamUserCard({id, isCurrentUser, profileImage, username, firstName, isAdmin, points }) {
    console.debug("ChoreCard");

    return (
        <Link to={`/chores/${id}`}>
            <div className="" style={{border: "1px solid red", margin: "20px"}}>
            <div className="">
                <img 
                    className="" 
                    alt={profileImage}
                    src={profileImage}
                /> 
                <h3>{firstName}</h3>  
                <p>{username}</p>
                
                {isCurrentUser ? <p>{`(Me)`}</p> : ""}
                {isAdmin ? <p>{`Admin`}</p> : ""}

            </div>

                <div className="">
                    <p className="">{points}</p>
                </div>
            </div>
        </Link>
    );
};

export default TeamUserCard;