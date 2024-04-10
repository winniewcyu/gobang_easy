import React, { useState } from 'react';
import { Navigate} from 'react-router-dom';
import Cookies from "universal-cookie";

function NewGamePrivate() {
    const [opponent, setOpponent] = useState(null);
    const [RoomID, setRoomID] = useState('');
    const [redirectToGame, setRedirectToGame] = useState(false);
    const cookies = new Cookies();
    const username = cookies.get('auth',{ path: "/" });
    const handleJoin = () => {
        
        // Validate roomID here
        if (RoomID) {
            // TODO: check if the roomID currently active
            fetch("http://localhost:8080/existingroom/" + RoomID, {
                method: "GET", 
            })
            .then((res) => {
                if (res.status === 200) {
                    return res.text(); // Return the text Promise
                } 
                else {
                    throw new Error(res.statusText); // Throw an error for non-200 status
                }
            })
            .then((responseText) => {
                alert(responseText); // Display the resolved response text
                //Perform the navigation here
                setRedirectToGame(true);
            })
            .catch((error) => {
                alert(error.message); // Display the error message
            });
        }
    };

    const handleCreate = () => {
        if (opponent === 'machine'){
            fetch("http://localhost:8080/game/machineprivate", {
                method: "PUT", 
                headers: {"Content-Type": "application/json",},
                body: JSON.stringify({ username: `${username}` }),
            })
            .then((res) => {
                if (res.status === 200) {
                    return res.text(); // Return the text Promise
                } 
                else {
                    throw new Error(res.statusText); // Throw an error for non-200 status
                }
            })
            .then((responseText) => {
                alert(responseText); // Display the resolved response text
                setRoomID(responseText.match(/\d+/));
                //Perform the navigation here
                setRedirectToGame(true);
            })
            .catch((error) => {
                alert(error.message); // Display the error message
            });
        }
        else {
            fetch("http://localhost:8080/game/humanprivate", {
                method: "PUT", 
                headers: {"Content-Type": "application/json",},
                body: JSON.stringify({ username: `${username}` }),
            })
            .then((res) => {
                if (res.status === 200) {
                    return res.text(); // Return the text Promise
                } 
                else {
                    throw new Error(res.statusText); // Throw an error for non-200 status
                }
            })
            .then((responseText) => {
                alert(responseText); // Display the resolved response text
                //Perform the navigation here
                setRoomID(responseText.match(/\d+/));
                setRedirectToGame(true);
            })
            .catch((error) => {
                alert(error.message); // Display the error message
            });
        }
    };

    if (redirectToGame) {
        return <Navigate to={{ pathname: "/GameUI", state: { opponent: opponent, RoomID: RoomID } }} />
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
