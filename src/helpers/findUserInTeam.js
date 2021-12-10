const findUserInTeam = (id, userArray) => {
    if(!userArray) throw new Error("Cannot Iterate Team of null");
    if(!Array.isArray(userArray)) throw new Error("Team is not an array");
    
    for (let user of userArray) {
        if (user._id === id) return user;
    };
    return "User ID not Found in current team! (fn:findUserInTeam)"
};

export default findUserInTeam;