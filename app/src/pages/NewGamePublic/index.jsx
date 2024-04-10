import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

function NewGamePublic () {
    const [opponent, setOpponent] = useState(null);

    if (opponent) {
        return <Navigate to={{ pathname: "/GameUI", state: { opponent: opponent } }} />
    }

    return (
        <>
            <div style={{textAlign:"center"}}>
                <br/>
                <ul style={{textAlign:"center"}}><a href="/user" class="btn btn-primary">Back to Home</a></ul>
                <ul style={{textAlign:"center", fontSize: 40}}>Please wait for a moment.......</ul>
                <div class="spinner-border"></div>
                <button onClick={() => setOpponent('machine')}>Play against Machine</button>
                <button onClick={() => setOpponent('human')}>Play against Human</button>
            </div>
        </>
    );
}

export default NewGamePublic;