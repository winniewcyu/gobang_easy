import React, { useState } from 'react';
import Cookies from "universal-cookie";
class GameRecord extends React.Component {
  constructor(props) {
    super(props);
    this.state = {result1: [], result2: []};
  }
  
  async componentDidMount() {
    const response = await fetch('http://localhost:8080/top5user', {
      method: 'GET',
    });
    const resultPage = await response.text();
    const cookies = new Cookies();
    const username = cookies.get('auth',{ path: "/" });
    const response2 = await fetch('http://localhost:8080/game/history/' + username, {
      method: 'GET',
      //body: JSON.stringify({ username: username }),
    });
    const resultPage2 = await response2.text();
    const result = resultPage.split("\n");
    this.setState({ result2: result })
    const records = resultPage2.split("\n\n");
    const result2 = records.map(record => {
      const [startTime, finishTime, player1, player2, winner, record1, record2, movement] = record.split('\n');
      return {
        startTime,
        finishTime,
        player1,
        player2,
        winner,
        record1,
        record2,
        movement
      };
    });
    console.log(result2);
    this.setState({ result1: result2 })
  }
    render() {
      const timestamp = Date.now();
      const date = new Date(timestamp);
      const humanReadableDate = date.toLocaleString();
      
        return(
        <>
        <ul style={{textAlign:"center"}}><a href="/user" class="btn btn-primary">Back to Home</a></ul>
        <div class="container p-5 my-5 border" style={{textAlign:"center"}}>
        <h1>Your Gaming Record: </h1>
        <h4>Update at: {humanReadableDate}</h4>
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
              {this.state.result1.map((record, index) => (
              <tr key={index}>
              <td>{record.startTime} - {record.finishTime}</td>
              <td>{record.player1} vs {record.player2}</td>
              <td>{record.winner}</td>
              <td>{record.record1} vs {record.record2}</td>
              <td>{record.movement}</td>
            </tr>
          ))}
              </tbody>
            </table>
          </div>
        </div>
        <div class="container p-5 my-5 border" style={{textAlign:"center"}}>
        <h1>Leaderboard (Top 5): </h1>
        <h4>Update at: {humanReadableDate}</h4>
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
                  <td>{this.state.result2[0]}</td>
                  <td>{this.state.result2[1]}</td>
                </tr>
                <tr>
                <td>{this.state.result2[2]}</td>
                  <td>{this.state.result2[3]}</td>
                </tr>
                <tr>
                <td>{this.state.result2[4]}</td>
                  <td>{this.state.result2[5]}</td>
                </tr>
                <tr>
                <td>{this.state.result2[6]}</td>
                  <td>{this.state.result2[7]}</td>
                </tr>
                <tr>
                <td>{this.state.result2[8]}</td>
                  <td>{this.state.result2[9]}</td>
                </tr>
                
              </tbody>
            </table>
          </div>
        </div>
        
        </>
        );
    }

}
export default GameRecord;

/*frontend functions:
1. fetch user game history
2. fetch top 5 users' scores
*/