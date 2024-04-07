class NewGame extends React.Component {
    render() {
        return(
        <>
        <div style={{textAlign:"center"}}>
        <br/>
        <ul style={{textAlign:"center", fontSize: 40}}>Choose the Mode of Game:</ul>
        <br/>
        <button class="btn btn-info" style={{width:'300px'}}>Play with Machine (in Public Match)</button>
        <pre/>
        <button class="btn btn-primary" style={{width:'300px'}}>Play with Machine (in Private Room)</button>
        <pre/>
        <a href="/newgamepublic" class="btn btn-secondary" style={{width:'300px'}}>Play with Human (in Public Match)</a>
        <pre/>
        <a href="/newgameprivate" class="btn btn-dark" style={{width:'300px'}}>Play with Human (in Private Room)</a>
        <pre/>
        <a href="/" class="btn btn-warning" style={{width:'300px'}}>Back to Home</a>
        </div>
        </>
        );
    }
}