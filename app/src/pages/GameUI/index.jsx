import React from 'react';
import './GameUI.css';
import Board from '../../components/board';
import Control from '../../components/control';
import ChatBox from '../../components/chatbox';
import ChatBoxJS from '../../components/chatboxJS';

function GameUI() {
    return (
      <div className="App">
        <Board />
        <Control />
        <ChatBox />
        <ChatBoxJS />
      </div>
    );
}
export default GameUI;