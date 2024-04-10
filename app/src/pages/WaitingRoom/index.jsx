import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Cookies from "universal-cookie";

function WaitingRoom () {
    const cookies = new Cookies();
    const username = cookies.get('auth',{ path: "/" });
    const navigate = useNavigate();
    const giveup = () => {
        fetch("http://localhost:8080/giveuppairing", {
                method: "DELETE", 
                headers: {"Content-Type": "application/json",},
                body: "",
            })
            .then((res) => {
                if (res.status === 201) {
                    return res.text(); // Return the text Promise
                } 
                else {
                    throw new Error(res.statusText); // Throw an error for non-200 status
                }
            })
            .then((responseText) => {
                alert(responseText); // Display the resolved response text
                //Perform the navigation here
                navigate('/newgamepublic');
            })
            .catch((error) => {
                alert(error.message); // Display the error message
            });
    }
    
    return (
        <>
            <div style={{textAlign:"center"}}>
                <br/>
                <ul style={{textAlign:"center", fontSize: 40}}>Please wait for a moment.......</ul>
                <div class="spinner-border"></div>
                <br/>
                <button onClick={() => giveup()}>Give up pairing</button>
            </div>
        </>
    );

}
export default WaitingRoom;