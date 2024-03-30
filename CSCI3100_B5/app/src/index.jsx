import ReactDOM from "react-dom/client";
import React from 'react';
import {BrowserRouter, Routes, Route, Link,} from 'react-router-dom';


class App extends React.Component{
    render(){
        return(
            <>
                <header className="bg-info">
                <br/>
                <h1 className="display-4 text-center">{this.props.name}</h1>
                <br/>
                <hr/>
                
                </header>
                
                <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/gamerecord" element={<GameRecord />} />
                            <Route path="/newgame" element={<NewGame />} />
                            <Route path="/newgamepublic" element={<NewGamePublic />} />
                            <Route path="/newgameprivate" element={<NewGamePrivate />} />
                            <Route path="/GameUI" element={<GameUI />} />
                            <Route path="/admin" element={<AdminPage />} />
                            <Route path="/admincrud" element={<AdminCRUD />} />
                            <Route path="*" element={<Home />} />
                        </Routes>
                </BrowserRouter>
                
            </>
        )
    }
}

class Home extends React.Component {
    render() {
        return (
            <>
            <div>
            <ul style={{textAlign:"center", fontSize: 30}}>Welcome back to Gobang Easy !</ul>
            <ul style={{textAlign:"center", fontSize: 20}}>You are login as Testing</ul>
            <ul style={{textAlign:"center", fontSize: 20}}>
            <a href="/newgame" class="btn btn-success">Start a New Game</a>
            <a href="/gamerecord" class="btn btn-secondary">View Game Record</a>
            <a href="/login" class="btn btn-warning">Logout</a>
            </ul>
            <ul style={{textAlign:"center"}}>
            <img src="GoBang Easy Logo.png" alt="Logo" width="500" height="500">
            </img>
            </ul>
            </div>
            
            </>
        
        )
    }
}

class Login extends React.Component {
    render() {
        return(
        <div class="container p-5 my-5 border" style={{textAlign:"center"}}>
            
            <body style={{display:"flex", justifyContent:'center', alignItems:'center'}}>
                <form style={{textAlign:'left' , margin:'100px', width:'auto'}}>                
                <h2>Login/Register</h2><br/>
                <label>Account: <input type="text" minLength={4} maxLength={16} pattern="[A-Za-z0-9]+" required/></label>
                <br/><br/>
                <label>Password: <input type="password" minLength={4} maxLength={16} pattern="[A-Za-z0-9]+" required/></label>
                <br/><br/>
                <button type="submit" class="btn btn-primary" style={{width:'120px'}}>Register</button>
                <button type="submit" class="btn btn-secondary" style={{width:'120px'}}>Login</button>
                <br/>
                <br/>
                </form>
                </body>
                
        </div>
        );
    }
}


class GameRecord extends React.Component {
    render() {
        return(
        <>
        <ul style={{textAlign:"center"}}><a href="/" class="btn btn-primary">Back to Home</a></ul>
        <div class="container p-5 my-5 border" style={{textAlign:"center"}}>
        <h1>Your Gaming Record: </h1>
        <h4>Update at: 31/3/2024, 10:04:40</h4>
        <div class="container mt-3">
            <table class="table">
              <thead class="table-secondary">
                <tr>
                  <th>Date & Time</th>
                  <th>Opponent's Name</th>
                  <th>Winner</th>
                  <th>Records</th>
                  <th>Final Goboard with Stones</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1/3/2024, 18:00:42-18:35:56</td>
                  <td>Test01</td>
                  <td>You</td>
                  <td>38 (+20)</td>
                  <td><a href="/gamerecord">Link</a></td>
                </tr>
                <tr>
                <td>7/11/2023, 17:17:19-17:55:45</td>
                <td>Test01</td>
                <td>Test01</td>
                <td>18 (+8)</td>
                <td><a href="/gamerecord">Link</a></td>
                </tr>
                <tr>
                <td>19/11/2022, 08:56:32-09:46:14</td>
                <td>Machine</td>
                <td>Machine</td>
                <td>10 (-5)</td>
                <td><a href="/gamerecord">Link</a></td>
                </tr>
                <tr>
                <td>11/9/2022, 09:44:46-11:45:11</td>
                <td>Test05</td>
                <td>Test05</td>
                  <td>15 (+0)</td>
                  <td><a href="/gamerecord">Link</a></td>
                </tr>
                <tr>
                <td>11/1/2022, 13:11:07-15:14:55</td>
                <td>Test02</td>
                <td>Test02</td>
                  <td>15 (+5)</td>
                  <td><a href="/gamerecord">Link</a></td>
                </tr>
                <tr>
                <td>11/11/2021, 11:36:53-11:58:44</td>
                <td>Test03</td>
                <td>You</td>
                  <td>10 (+10)</td>
                  <td><a href="/gamerecord">Link</a></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="container p-5 my-5 border" style={{textAlign:"center"}}>
        <h1>Leaderboard (Top 5): </h1>
        <h4>Update at: 31/3/2024, 10:04:40</h4>
        <div class="container mt-3">
            <table class="table">
              <thead class="table-secondary">
                <tr>
                  <th>Player</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Test01</td>
                  <td>130</td>
                </tr>
                <tr>
                <td>Test02</td>
                  <td>128</td>
                </tr>
                <tr>
                <td>Test03</td>
                  <td>69</td>
                </tr>
                <tr>
                <td>You (Test)</td>
                  <td>38</td>
                </tr>
                <tr>
                <td>Test04</td>
                  <td>19</td>
                </tr>
                
              </tbody>
            </table>
          </div>
        </div>
        
        </>
        );
    }
}

class NewGame extends React.Component {
    render() {
        return(
        <>
        <div style={{textAlign:"center"}}>
        <br/>
        <ul style={{textAlign:"center", fontSize: 40}}>Choose the Mode of Game:</ul>
        <br/>
        <button class="btn btn-info" style={{width:'300px'}}>Play with Machine (in Public Match)</button>
        <pre/>
        <button class="btn btn-primary" style={{width:'300px'}}>Play with Machine (in Private Room)</button>
        <pre/>
        <a href="/newgamepublic" class="btn btn-secondary" style={{width:'300px'}}>Play with Human (in Public Match)</a>
        <pre/>
        <a href="/newgameprivate" class="btn btn-dark" style={{width:'300px'}}>Play with Human (in Private Room)</a>
        <pre/>
        <a href="/" class="btn btn-warning" style={{width:'300px'}}>Back to Home</a>
        </div>
        </>
        );
    }
}

class NewGamePublic extends React.Component {
    render() {
        return(
        <>
        <div style={{textAlign:"center"}}>
        <br/>
        <ul style={{textAlign:"center", fontSize: 40}}>Please wait for a moment.......</ul><div class="spinner-border"></div>
        </div>
        </>
        );
    }
}

class NewGamePrivate extends React.Component {
    render() {
        return(
        <>
        <div style={{textAlign:"center"}}>
        <br/>
        <ul style={{textAlign:"center", fontSize: 20}}>**One of your friend have invited you to join his/her private match, click the button below to join.</ul>
        <ul><button type="submit" class="btn btn-primary" style={{width:'120px'}}>Join</button></ul>
        <br/><br/><br/>
        <h3 style={{textAlign:"center"}}>Create a private room (Invite 1-3 firend(s) to join):</h3>
        <br/>
                <form>
                <label>Username(s): <input type="text" minLength={4} maxLength={16} pattern="[A-Za-z0-9]+" required/></label>
                <pre/><pre/>
                <pre/>
                
                <button type="submit" class="btn btn-secondary" style={{width:'120px'}}>Create</button>
                <br/>
                <br/>
                </form>
        </div>
        </>
        );
    }
}



class GameUI extends React.Component {
    render() {
        return(
            <>
            <div class="container p-5 my-5 border" style={{textAlign:"center"}}>
            <span class="row">
            <span class="col-sm-7">
            <div style={{textAlign:"center"}}>
            <ul style={{textAlign:"center", fontSize: 40}}>Remaining Time: 57s</ul>
            <span class="col-sm-3" style={{fontSize: 25}}>Current Player: Test01 </span>
            <br/>
            <span class="col-sm-3" style={{fontSize: 25}}>Stone Type: White </span>
            <br/>
            <br/>
            <button class="btn btn-secondary">Undo Request</button>
            <button class="btn btn-warning">End the Game</button>
            <button class="btn btn-primary">Invite friends</button>
            
            </div>
            <ul></ul>
                <img src="Gameboard.png" alt="Gameboard" width="600" height="600">
                </img>
                </span>
            <span class="col-sm-4">
            <br/>
            <h1>Chat History:</h1>
            <pre/><pre/><pre/>
            <ul style={{textAlign:"left"}}>Test01: I win laaaaaaaaa!!!!</ul>
            <ul style={{textAlign:"left"}}>You: Not a chance!!!!</ul>
            <textarea style={{width: "100%", height: "100px"}} placeholder="please input message"></textarea>
            <button>Send</button>
            </span>
            </span>
            </div>
            </>
        );
    }
}

class AdminPage extends React.Component {
    render() {
        return (
            <>
            <div>
            <ul style={{textAlign:"center", fontSize: 30}}>Welcome back to Gobang Easy !</ul>
            <ul style={{textAlign:"center", fontSize: 20}}>You are login as Admin</ul>
            <ul style={{textAlign:"center", fontSize: 20}}>
            <a href="/admincrud" class="btn btn-success">Admin CRUD</a>
            <a href="/gamerecord" class="btn btn-secondary">View Game Record</a>
            <a href="/login" class="btn btn-warning">Logout</a>
            </ul>
            <ul style={{textAlign:"center"}}>
            <img src="GoBang Easy Logo.png" alt="Logo" width="500" height="500">
            </img>
            </ul>
            </div>
            
            </>
        
        )
    }
}


class AdminCRUD extends React.Component {
    render() {
        return(
        <>
        <h2 style={{textAlign:"center"}}>You are now an admin and you can do CRUD now</h2>
        <br></br>
        <div class="container p-5 my-5 border">
        <h3 style={{textAlign:"center"}}>CRUD User Data</h3>
        <br></br><br></br>
        <span class="row">
        <span class="col-sm-3">
        <h3>Create admin User</h3>
            <body>
              <br></br>
              <form id="CAdminUser">
                 <label for="CAdmin">New Admin Username: </label>
                 <br></br>
                 <input type="text" id="CAdmin" name="CAdmin" placeholder="Michael" required></input>
                 <br></br>
                 <label for="CAdminPw">Password: </label>
                 <br></br>
                 <input type="text" id="CAdminPw" name="CAdminPw" required></input>
                 <br></br><br></br>
                 <input type="submit" value="Create"></input>
              </form>
            </body>
            </span>
            <span class="col-sm-3">
        <h3>Read(Find) Users</h3>
            <body>
              <br></br>
              <form id="RUser">
                 <label for="RUsername">By Username: </label>
                 <br></br>
                 <input type="text" id="RUsername" name="RUsername" placeholder="Michael" required></input>
                 <br></br><br></br>
                 <input type="submit" value="Find"></input>
              </form>
            <br></br>
            <button>Find All</button>
            </body>
            </span>
            <span class="col-sm-3">
            <h3>Update User Info</h3>
            <body>
              <br></br>
              <form id="UUser">
                 <label for="UUsername">Username: </label>
                 <br></br>
                 <input type="text" id="UUsername" name="UUsername" placeholder="Michael" required></input>
                 <br></br>
                 <label for="UScore">Change Score: </label>
                 <br></br>
                 <input type="number" id="UScore" name="UScore" placeholder="150"></input>
                 <br></br><br></br>
                 <input type="submit" value="Update"></input>
              </form>
            </body>
            </span>
            
            <span class="col-sm-3">
        <h3>Delete User</h3>
        <body>
              <br></br>
              <form id="DUser">
                 <label for="DUsername">Username: </label>
                 <br></br>
                 <input type="text" id="DUsername" name="DUsername" placeholder="Michael" required></input>
                 <br></br><br></br>
                 <input type="submit" value="Delete"></input>
              </form>
              </body>
            </span>
            </span>
        </div>
            </>
            );
    }
}

const root = ReactDOM.createRoot(document.querySelector("#app"));
root.render( <App name="GoBang Easy" />);