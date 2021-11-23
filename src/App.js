import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes/Routes";
import Footer from "./common/Footer";
import ChoresApi from "./api/api";
import UserContext from "./auth/UserContext";
import useLocalStorage from "./hooks/useLocalStorage";
import jwt from "jsonwebtoken";
import Navigation from "./routes/Navigation";
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import './scss/App.scss';
import LoadingSpinner from "./common/LoadingSpinner";

export const TOKEN_STORAGE_ID = "chores_token";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentTeamUsers, setCurrentTeamUsers] = useState(null);
  const [isAdmin, setIsAdmin] = useState(null);
  const [currentTeam, setCurrentTeam] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const [infoLoaded, setInfoLoaded] = useState(false);

  useEffect(function loadUserInfo() {
    console.debug("App useEffect loadUserInfo", "token=", token);

    async function getCurrentUser() {
      if (token) {
        try {
          let { userId, teamId } = jwt.decode(token);
          console.log("userId: ", userId)
          console.log("teamId: ", teamId)
          ChoresApi.token = token;

          let currentUser = await ChoresApi.getCurrentUser(userId);

          if (teamId !== "none") {
            let currentTeam = await ChoresApi.getCurrentTeam(teamId)
            console.log("current team: ", currentTeam)
            console.log("token :", token)
            console.log("current user: ", currentUser)

            let currentTeamUsers = await ChoresApi.getAllTeamUsers();

            console.log("current team users: ", currentTeamUsers);

            setCurrentTeamUsers(currentTeamUsers);
            setCurrentUser(currentUser);
            setIsAdmin(currentUser.role === "admin");
            setCurrentTeam(currentTeam);

          } else {
            let currentTeam = null;
            setCurrentUser(currentUser);
            setIsAdmin(currentUser.role === "admin");
            setCurrentTeam(currentTeam);
          };
        } catch (e) {
          console.error("App loadUserInfo: problem loading", e);
          setCurrentTeamUsers(null)
          setCurrentUser(null);
          setCurrentTeam(null);
          setIsAdmin(null);
        };
      };
      setInfoLoaded(true);
    };

    setInfoLoaded(false);
    getCurrentUser();
  }, [token]);

  function logout() {
    console.log("logout")
    setCurrentTeamUsers(null)
    setCurrentUser(null);
    setIsAdmin(null);
    setCurrentTeam(null);
    setToken(null);
  };

  async function signup(signupData) {
    try {
      let token = await ChoresApi.signup(signupData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("Signup Failed", errors)
      return { success: false, errors };
    };
  };

  async function login(loginData) {
    try {
      let token = await ChoresApi.login(loginData);
      setToken(token);
      console.log("token : ", token)
      return { success: true };
    } catch (errors) {
      console.error("Login Failed", errors)
      return { success: false, errors };
    };
  };

  async function createTeam(createTeamData) {
    try {
      let token = await ChoresApi.createTeam(createTeamData);
      console.log("token : ", token)
      setToken(token);

      return { success: true };
    } catch (errors) {
      console.error("Failed to create team", errors)
      return { success: false, errors };
    };
  };

  async function joinTeam(joinTeamData) {
    try {
      let token = await ChoresApi.joinTeam(joinTeamData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("Failed to join team", errors)
      return { success: false, errors };
    };
  };

  async function createChore(createChoreData) {
    try {
      let newChore = await ChoresApi.createChore(createChoreData);

      return { success: true, newChore };
    } catch (errors) {
      console.error("Failed to create chore", errors)
      return { success: false, errors };
    };
  };

  async function createReward(createRewardData) {
    try {
      let newReward = await ChoresApi.createReward(createRewardData);
      console.log(newReward)
      return { success: true, newReward };
    } catch (errors) {
      console.error("Failed to create reward", errors)
      return { success: false, errors };
    };
  };

  if (!infoLoaded) return <LoadingSpinner />;

  return (
    <BrowserRouter>
      <UserContext.Provider
        value={{
          currentUser,
          setCurrentUser,
          currentTeam,
          setCurrentTeam,
          isAdmin,
          setIsAdmin,
          currentTeamUsers
        }}>

        <React.Fragment>
          <CssBaseline />

          <div className="Body__top">
            <Navigation logout={logout} />
          </div>
          <div className="Body__main">
            <Routes
              login={login}
              signup={signup}
              createTeam={createTeam}
              joinTeam={joinTeam}
              createChore={createChore}
              createReward={createReward}
            />
          </div>

          <Footer />
        </React.Fragment>

      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
