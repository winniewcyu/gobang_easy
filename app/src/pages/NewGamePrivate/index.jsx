import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

function NewGamePrivate() {
    const [opponent, setOpponent] = useState(null);
    const [roomID, setRoomID] = useState('');
    const [redirectToGame, setRedirectToGame] = useState(false);

    const handleJoin = () => {
        // Validate roomID here
        if (roomID) {
            // TODO: check if the roomID currently active
            setRedirectToGame(true);
        }
    };

    const handleCreate = () => {
        // Create room ID
        setRoomID(Math.random().toString(36).substring(2, 7)); // Generate a random room ID
        setRedirectToGame(true);
    };

    if (redirectToGame) {
        return <Redirect to={{ pathname: "/GameUI", state: { opponent: opponent, roomID: roomID } }} />
    }

    return (
        <>
            <div style={{textAlign:"center"}}>
                <br/>
                <ul style={{textAlign:"center", fontSize: 40}}>Select your opponent:</ul>
                <button onClick={() => {setOpponent('machine'); handleCreate();}}>Machine</button>
                <button onClick={() => setOpponent('human')}>Human</button>
                {opponent === 'human' && (
                    <div>
                        <p>Do you want to join a room or create a new one?</p>
                        <button onClick={handleJoin}>Join Room</button>
                        <button onClick={handleCreate}>Create Room</button>
                        <input type="text" placeholder="Enter Room ID" onChange={(e) => setRoomID(e.target.value)} />
                    </div>
                )}
            </div>
        </>
    );
}

export default NewGamePrivate;
