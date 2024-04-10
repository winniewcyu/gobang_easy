import React, { useEffect } from 'react';
import './GameUI.css';
import Board from '../../components/board';
import Control from '../../components/control';
import ChatBox from '../../components/chatbox';
import bgm from '../../assets/bgm.mp3'; // Path to your background music file

function GameUI() {
    const audioRef = React.useRef(null);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.play();
        }
    }, []);

    return (
      <div className="App" onClick={() => audioRef.current.muted = false}>
        <Board />
        <Control />
        <ChatBox />
        <audio src={bgm} autoPlay loop muted ref={audioRef} />
      </div>
    );
}

export default GameUI;
