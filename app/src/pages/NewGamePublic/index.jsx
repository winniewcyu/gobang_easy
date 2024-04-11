import React, { useState } from 'react';
import {useNavigate } from 'react-router-dom';
import Cookies from "universal-cookie";

function NewGamePublic () {
    const [opponent, setOpponent] = useState(null);
    const cookies = new Cookies();
    const username = cookies.get('auth',{ path: "/" });
    const navigate = useNavigate();

    if (opponent === 'machine') {
        fetch("http://localhost:8080/game/machinepublic", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
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
            const RID = responseText.match(/\d+/);
            //Perform the navigation here
            navigate('/GameUI', { opponent: opponent, RoomID: RID });
        })
        .catch((error) => {
            alert(error.message); // Display the error message
        });
    }
    else if (opponent === 'human'){
        fetch("http://localhost:8080/pairing", {
                method: "POST", 
                headers: {"Content-Type": "application/json",},
                body: JSON.stringify({ username: `${username}` }),
            })
            .then((res) => {
                console.log(res.status);
                if (res.status === 200) {
                    return res.text(); // Return the text Promise
                }
                else if (res.status === 201) {
                    alert("You are added to the Waiting Room");
                    return res.text();
                }
                else {
                    throw new Error(res.statusText); // Throw an error for non-200 status
                }; // Always return the text Promise
            })
            .then((responseText) => {
                if (responseText === "Waiting Room") {
                    // Initiate the navigation to the Waiting Room
                    navigate('/WaitingRoom');
                }
                else {
                    alert("anotherplayer: "+ responseText);
                    const anotherplayer = responseText;
                    return fetch("http://localhost:8080/game/humanpublic", {
                       method: "PUT", 
                       headers: {"Content-Type": "application/json",},
                       body: JSON.stringify({ username: username, anotherplayer: anotherplayer }),
                    })
                    .then((res2) => {
                        if (res2.status === 200) {
                            return res2.text(); // Return the text Promise
                        } 
                        else {
                            throw new Error(res2.statusText); // Throw an error for non-200 status
                        }
                    })
                    .then((responseText2) => {
                        alert("RoomID: " + responseText2);
                        const RID = responseText.match(/\d+/)
                        navigate('/GameUI', { opponent: opponent, RoomID: RID });
                    })
                    .catch((error) => {
                        alert(error.message); // Display the error message
                    });
                }
            })
            .catch((error) => {
                alert(error.message); // Display the error message
            });   
    }

    return (
        <>
            <div style={{textAlign:"center"}}>
                <br/>
                <button onClick={() => setOpponent('machine')}>Play against Machine</button>
                <button onClick={() => setOpponent('human')}>Play against Human</button>
                <ul style={{textAlign: "center", marginRight: "25px"}}><a href="/user" className="btn btn-primary">Back to Home</a></ul>
            </div>
        </>
    );
}

export default NewGamePublic;
