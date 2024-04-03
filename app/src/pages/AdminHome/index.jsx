class AdminPage extends React.Component {
    render() {
        return (
            <>
            <div>
            <ul style={{textAlign:"center", fontSize: 30}}>Welcome back to Gobang Easy !</ul>
            <ul style={{textAlign:"center", fontSize: 20}}>You are login as Admin</ul>
            <ul style={{textAlign:"center", fontSize: 20}}>
            <a href="/admincrud" class="btn btn-success">Admin CRUD</a>
            <a href="/gamerecord" class="btn btn-secondary">View Game Record</a>
            <a href="/login" class="btn btn-warning">Logout</a>
            </ul>
            <ul style={{textAlign:"center"}}>
            <img src="GoBang Easy Logo.png" alt="Logo" width="500" height="500">
            </img>
            </ul>
            </div>
            
            </>
        
        )
    }
}