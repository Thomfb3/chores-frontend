const findUserInTeam = (id, userArray) => {
    for (let user of userArray) {
        if (user._id === id) return user;
    };
    return "User ID not Found in current team! (fn:findUserInTeam)"
};

export default findUserInTeam;