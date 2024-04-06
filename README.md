# gobang_easy
CSCI3100 Group B5 Spring2024
Latest Update: 03/04/2024

Welcome to the CSCI3100 Project: Gobang Easy. This document provides an overview of the project's structure, key components, and development process. 


## Internal Notes: To be deleted after finished

game logic:

[ ] moveListener: //TODO fetch after end game

game interface:

[ ] Registrat: // TODO: Check if username already exist

[x] Login

[x] Home

[ ] server: // TODO: link with db

[ ] NewGame: change to functional programming instead of class 

[ ] NewGamePublic: change to functional programming instead of class, and link to GameUI

[ ] NewGamePrivate: change to functional programming instead of class, the ui of inviting friend should be just a button that raise alert on online friend interface with the roomID, join room require input: placeholder: Enter Room ID, and link to GameUI

[ ] GameUI: most disastrous shit to be complete

[ ] GameRecord: change to functional programming instead of class, and changing hard code to really functioning codes

[ ] AdminHome: change to functional programming instead of class, please follow Home for reference

[ ] AdminCRUD: change to functional programming instead of class, connect to db 

>tick the box if you have finished tasks above, thanks for effective contributing

## Credit

This project takes reference on [gobang] (https://github.com/lihongxun945/gobang.git) by [lihongxun945] (https://github.com/lihongxun945).

## Steps to run on your device

1. Download with git clone, or zipped file(remeber to unzip it before using)
2. Access directory ../GOBANG_EASY/app through terminal
3. `npm install` <-- supposingly this works with 3-5
3. `npm install react react-dom react-scripts `
4. `npm install react-router-dom`
5. `npm install universal-cookie`
4. `npm start`

## Steps to start the server

1. Suppose you have finished steps 1 and 2 to run on your device
2. `npm install express body-parser mongoose bcrypt`
3. `node server.js`

## Directory Structure and Functionality 
Below is an outline of the project's directory structure along with a description of the contents and functionality of each directory and file.

- `/app` - Contains all the source code files for the project.
  - `/public` - Contain index.html which included academic honesty declaration.
  - `/src` 
    - `/components` - Stores reusable UI components (images) used across different parts of the application.
    - `/pages` - Contains build and deployment scripts to automate parts of the development process.

## System Building Procedure //to_be_justify

The system was built using the following procedure and key components:

1. **Setup Development Environment** - Configured the local development `localhost:3000` environment with react.
2. **Database Integration** - ?mongodb/posgresql? has been implemented for robust data management and retrieval. Record of upload can be inserted and deleted by logged in users.
3. **Coding Standards** - Followed best practices in coding standards to ensure readability and maintainability.
4. **Version Control** - Utilized Git for version control, with systematic commits and descriptive messages.
5. **Testing and Debugging** - Manually testing whether codes are implemented correctly to ensure the stability and reliability of the system.
6. **Deployment** - Deployed the application on the ?github? server using continuous deployment pipelines.

Compared to the streamlined model, this project employs the prototyping method, which emphasizes iterative implementation and debugging.

## Accomplishments and Bonus Request //to_be_amend


*BONUS*


## Partially Completed Work //to_be_amend

While we strived to complete all aspects of the project, the following parts are not fully completed:



---

Thank you for reviewing my project. For further questions or clarifications, please do not hesitate to contact me through 1155175846@link.cuhk.edu.hk
