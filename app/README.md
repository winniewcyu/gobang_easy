# gobang_easy
CSCI3100 Group B5 Spring2024
Latest Update: 10/04/2024

Welcome to the CSCI3100 Project: Gobang Easy. This document provides an overview of the project's structure, key components, and development process. 

## Credit

This project takes reference on [gobang] (https://github.com/lihongxun945/gobang.git) by [lihongxun945] (https://github.com/lihongxun945).

## Steps to run on your device

1. Download with git clone, or zipped file(remeber to unzip it before using)
2. Access directory ../GOBANG_EASY/app through terminal
3. `npm install` 
4. `npm start`

## Steps to start the server

1. Suppose you have finished steps 1 and 2 to run on your device
2. `npm install`
3. `node server.js`

## Directory Structure and Functionality 
Below is an outline of the project's directory structure along with a description of the contents and functionality of each directory and file.

- `/app` - Contains all the source code files for the project.
  - `/public` - Contain index.html which included academic honesty declaration.
  - `/src` 
    - `/components` - Stores reusable UI components (images) used across different parts of the application.
    - `/pages` - Contains build and deployment scripts to automate parts of the development process.
    - `/store` - Store game condition, significantly contribute to entire run of application.
    - `/chessBot` - Consists of code for win checking, reusable as end game mechanism.
    - `/assests` - Contain wallpaper of game board.

## System Building Procedure 

The system was built using the following procedure and key components:

1. **Setup Development Environment** - Configured the local development `localhost:3000` environment with react and used node.js with mongodb for server setup.
2. **Database Integration** - Mongodb has been implemented for robust data management and retrieval. Record of upload can be inserted and deleted by logged in users.
3. **Coding Standards** - Followed best practices in coding standards to ensure readability and maintainability.
4. **Version Control** - Utilized Git for version control, with systematic commits and descriptive messages.
5. **Testing and Debugging** - Manually testing whether codes are implemented correctly to ensure the stability and reliability of the system.

Compared to the streamlined model, this project employs the prototyping method, which emphasizes iterative implementation and debugging.

## Accomplishments and Bonus Request //to_be_amend

[x] **Database Intergration** - Integrate a global database, i.e: MongoDB

[ ] **Two human players** - Support two-human player game. Players are connected via a server (local), and each player has a separate game window.

[ ] **Random Player** - Support the game between a human player and a random player

[x] **User signup** - Create a new user profile. Only user name and password are needed.

[x] **User Login & Logout** - Let users login and logout in your game. Users should be able to conduct more operations after login.

[ ] **View Game Records** - Users can view the game record with the following attributes: start time, elapsed time, player names, winner, and the final Goboard with stones.

[x] **Upon Login** - Upon login, show the main page with two panels: “start new game”, “view the game 
records”.

[x] **During the game** - During the game, display a 19x19 Goboard, current player and its stone type, all player scores, start time, elapsed time. The 
information should be presented clearly and correctly.

[x] **Player move** - After a player places a stone, the stone is rendered correctly. Meanwhile, different players have different stones.

[x] **Gameover** - When a player forms five consecutive pieces of the same color on the horizontal, vertical, and diagonal directions, the game ends. The game returns to the main page.

[ ] **Retract a false move** - In a game of two human players, one player can retract a false move after seeking agreement from another human player.

[x] **Chat System** - Players are able to send and receive chat messages from each other during the game.

**BONUS**

[ ] **Add friends and further invite friends to a game**

[x] **Early Termination of the Game (e.g., “open 4” 活四, double "open 3s" 雙活三)**

[x] **Time control. For example, each player has a main time limit, say 20 minutes to make decisions on all their moves. Once a player uses up their main time, they enter into the elegant time period. This is often a series of fixed time intervals, like 30 seconds per move.** 

[ ] **detect and disallow (some of) the forbidden moves**

[x] **Implement Game AI with (some of) the following techniques: Rule-based AI - Advanced Techniques, e.g. alpha-beta pruning.**

[x] **Implement admin users that can view user records and delete users.**

[x] **Sound effects of the game**

[x] **Good UI Design**

**Extra Bonus**

[x] **Allow player to choose between black or white stone.**

[x] **Password of every users are hashed before storing to db.**

[x] **Wallpaper of game board can be chosen between three options.**

## Partially Completed Work //to_be_amend

While we strived to complete all aspects of the project, the following parts are not fully completed:



---

Thank you for reviewing my project. For further questions or clarifications, please do not hesitate to contact me through 1155175846@link.cuhk.edu.hk
