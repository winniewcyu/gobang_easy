import React from 'react';
import './GameUI.css';
import Board from '../../components/board';
import Control from '../../components/control';
import { Provider } from 'react-redux';
import store from '../store';

function GamUI() {
    return (
      <div className="App">
        <Board />
        <Control />
      </div>
    );
  }
  export default GameUI;
    /*render() {
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
}*/
