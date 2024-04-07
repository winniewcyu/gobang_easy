class NewGamePrivate extends React.Component {
    render() {
        return(
        <>
        <div style={{textAlign:"center"}}>
        <br/>
        <ul style={{textAlign:"center", fontSize: 20}}>**One of your friend have invited you to join his/her private match, click the button below to join.</ul>
        <ul><button type="submit" class="btn btn-primary" style={{width:'120px'}}>Join</button></ul>
        <br/><br/><br/>
        <h3 style={{textAlign:"center"}}>Create a private room (Invite 1-3 firend(s) to join):</h3>
        <br/>
                <form>
                <label>Username(s): <input type="text" minLength={4} maxLength={16} pattern="[A-Za-z0-9]+" required/></label>
                <pre/><pre/>
                <pre/>
                
                <button type="submit" class="btn btn-secondary" style={{width:'120px'}}>Create</button>
                <br/>
                <br/>
                </form>
        </div>
        </>
        );
    }
}