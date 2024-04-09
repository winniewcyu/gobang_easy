import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";

function Home() {
  const cookies = new Cookies();
  const [userName, setUserName] = useState("");

  // Fetch the username from cookies when the component mounts
  useEffect(() => {
    const userNameFromCookies = cookies.get("userName");
    if (userNameFromCookies) {
      setUserName(userNameFromCookies);
    }
  }, [cookies]);

  return (
    <div>
      <ul style={{textAlign:"center", fontSize: 30}}>Welcome back to Gobang Easy !</ul>
      <ul style={{textAlign:"center", fontSize: 20}}>You are login as {userName}</ul>
      <ul style={{textAlign:"center", fontSize: 20}}>
        <a href="/newgame" class="btn btn-success">Start a New Game</a>
        <a href="/gamerecord" class="btn btn-secondary">View Game Record</a>
        <a href="/logout" class="btn btn-warning">Logout</a>
      </ul>
      <ul style={{textAlign:"center"}}>
        <img src="GoBang Easy Logo.png" alt="Logo" width="500" height="500"></img>
      </ul>
    </div>
  );
}

export default Home;
