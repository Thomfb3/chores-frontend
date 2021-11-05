import React, { useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Homepage from "../homepage/Homepage";
import TeamChoresList from "../chores/TeamChoresList";
import MyChoresList from "../chores/MyChoresList";
import UnclaimedChoresList from "../chores/UnclaimedChoresList";
import ChoreDetails from "../chores/ChoreDetails";
import CreateChoreForm from "../chores/CreateChoreForm";
import TeamUserList from "../Teams/TeamUserList";
import LoginForm from "../auth/LoginForm";
import SignupForm from "../auth/SignupForm";
import CreateTeamForm from "../auth/CreateTeamForm";
import JoinTeamForm from "../auth/JoinTeamForm";
import ProfileForm from "../users/ProfileForm";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import ChoreCommentContext from "../comments/ChoreCommentContext";

function Routes({ login, signup, createTeam, joinTeam, createChore, postChoreComment }) {
    let [currentChoreComments, setCurrentChoreComments] = useState([])

    return (
        <div>
            <Switch>
                <Route exact path="/">
                    <Homepage />
                </Route>

                <Route exact path="/login">
                    <LoginForm login={login} />
                </Route>

                <Route exact path="/signup">
                    <SignupForm signup={signup} />
                </Route>

                <Route exact path="/create-team">
                    <CreateTeamForm createTeam={createTeam} />
                </Route>

                <Route exact path="/join-team">
                    <JoinTeamForm joinTeam={joinTeam} />
                </Route>


                <PrivateRoute exact path="/chores">
                    <TeamChoresList />
                </PrivateRoute>

                <PrivateRoute exact path="/my-chores">
                    <MyChoresList postChoreComment={postChoreComment}/>
                </PrivateRoute>

                <PrivateRoute exact path="/unclaimed-chores">
                    <UnclaimedChoresList />
                </PrivateRoute>

                <PrivateRoute exact path="/chores/:id">
                    <ChoreCommentContext.Provider value={{currentChoreComments, setCurrentChoreComments}}>
                        <ChoreDetails />
                    </ChoreCommentContext.Provider>
                </PrivateRoute>

                <PrivateRoute exact path="/team">
                    <TeamUserList />
                </PrivateRoute>

                <PrivateRoute exact path="/profile">
                    <ProfileForm />
                </PrivateRoute>

                <AdminRoute exact path="/manage-chores">
                    <CreateChoreForm createChore={createChore} />
                </AdminRoute>

                <Redirect to="/"/>

            </Switch>
        </div>
    );
};

export default Routes;