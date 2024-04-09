import React from 'react';
import './GameUI.css';
import Board from '../../components/board';
import Control from '../../components/control';
import ChatBox from '../../components/chatbox';

function GameUI() {
    return (
      <div className="App">
        <Board />
        <Control />
        <ChatBox />
      </div>
    );
}
export default GameUI;