import React from "react";
import UserContext from "./auth/UserContext";
import ChoreCommentContext from "./comments/ChoreCommentContext";

const demoUser = {
  _id: "userid1",
  username: "testuser1",
  firstName: "testfirst1",
  lastName: "testlast1",
  profileImage: "defaultProfile.jpg",
  allTimePoints: 1000,
  currentPoints: 200,
  role: "admin"
};

const testTeam = {
  _id: "testTeam",
  name: "testTeam"
};

const testTeamUsers = [
  {
    _id: "userid1",
    username: "testuser1",
    firstName: "testfirst1",
    lastName: "testlast1",
    profileImage: "defaultProfile.jpg",
    allTimePoints: 1000,
    currentPoints: 200,
    role: "admin"
  },
  {
    _id: "userid2",
    username: "testuser2",
    firstName: "testfirst2",
    lastName: "testlast2",
    profileImage: "defaultProfile.jpg",
    allTimePoints: 1000,
    currentPoints: 200,
    role: "user"
  },
  {
    _id: "userid3",
    username: "testuser3",
    firstName: "testfirst3",
    lastName: "testlast3",
    profileImage: "defaultProfile.jpg",
    allTimePoints: 1000,
    currentPoints: 200,
    role: "user"
  },
  {
    _id: "userid4",
    username: "testuser4",
    firstName: "testfirst4",
    lastName: "testlast4",
    profileImage: "defaultProfile.jpg",
    allTimePoints: 1000,
    currentPoints: 200,
    role: "user"
  }
];

let choreComments = [];

const UserProvider =
  ({ children,
    currentUser = demoUser,
    currentTeam = testTeam,
    currentTeamUsers = testTeamUsers,
    isAdmin = false
  }) => (
      <UserContext.Provider value={{ currentUser, currentTeam, currentTeamUsers }}>
        {children}
      </UserContext.Provider>
    );


const CommentProvider =
  ({ children,
    currentChoreComments = choreComments
  }) => (
      <ChoreCommentContext.Provider value={{ currentChoreComments }}>
        {children}
      </ChoreCommentContext.Provider>
    );

export { UserProvider, CommentProvider };

