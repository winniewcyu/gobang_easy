import React from 'react';

class NewGame extends React.Component {
    render() {
        return(
        <>
        <div style={{textAlign:"center"}}>
        <br/>
        <ul style={{textAlign:"center", fontSize: 40}}>Choose the Mode of Game:</ul>
        <br/>
        <a href="/newgamepublic" class="btn btn-secondary" style={{width:'300px'}}>Public Match</a>
        <pre/>
        <a href="/newgameprivate" class="btn btn-dark" style={{width:'300px'}}>Private Match</a>
        <pre/>
        <a href="/user" class="btn btn-warning" style={{width:'300px'}}>Back to Home</a>
        </div>
        </>
        );
    }
}
export default NewGame;