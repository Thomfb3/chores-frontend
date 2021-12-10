# ChoreBoard FrontEnd

## Objective
This is the Frontend of an application called ChoreBoard. In this application, users can create teams with household chores can be created and assigned to members of their team. Completed chores assigned in the app allows users to score points. Points in the app can be used to redeem rewards created and sponsored by the team manager. The concept is to "gamify" household chores.
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Testing is down with Jest and React Testing library.
Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Users
The demographic for our users will can be anyone that shares household responsibilities with people whom they share a home or office.

## API / Data
The Backend of the application is an api built with Node.js with the Express.js framework and Mongoose object data modeling library which connects to the Mongo DB database.

## Database Schema
The NoSQL database has collections for users, teams, chores, rewards, and comments. The team manager can create chores and rewards. Users can update chore status and claim rewards.

## Security
The app protects User data. Password and sensitive user info are encrypted on the database. The backend has measures to sanitize data, validate data, and encrypt user data. JSON Web Tokens are used to validate user sessions.

## Functionality Checklist
The app has the following functionality:  
- User Login 
- User Sign Up
- Create a team
- Join a team
- Create a chore
- Comment on a chore
- Claim unassigned chore
- Update a chore status
- Delete a chore
- Delete a chore comment
- Claim a reward
- Update a user profile