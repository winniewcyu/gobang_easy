class AdminCRUD extends React.Component {
    render() {
        return(
        <>
        <h2 style={{textAlign:"center"}}>You are now an admin and you can do CRUD now</h2>
        <br></br>
        <div class="container p-5 my-5 border">
        <h3 style={{textAlign:"center"}}>CRUD User Data</h3>
        <br></br><br></br>
        <span class="row">
        <span class="col-sm-3">
        <h3>Create admin User</h3>
            <body>
              <br></br>
              <form id="CAdminUser">
                 <label for="CAdmin">New Admin Username: </label>
                 <br></br>
                 <input type="text" id="CAdmin" name="CAdmin" placeholder="Michael" required></input>
                 <br></br>
                 <label for="CAdminPw">Password: </label>
                 <br></br>
                 <input type="text" id="CAdminPw" name="CAdminPw" required></input>
                 <br></br><br></br>
                 <input type="submit" value="Create"></input>
              </form>
            </body>
            </span>
            <span class="col-sm-3">
        <h3>Read(Find) Users</h3>
            <body>
              <br></br>
              <form id="RUser">
                 <label for="RUsername">By Username: </label>
                 <br></br>
                 <input type="text" id="RUsername" name="RUsername" placeholder="Michael" required></input>
                 <br></br><br></br>
                 <input type="submit" value="Find"></input>
              </form>
            <br></br>
            <button>Find All</button>
            </body>
            </span>
            <span class="col-sm-3">
            <h3>Update User Info</h3>
            <body>
              <br></br>
              <form id="UUser">
                 <label for="UUsername">Username: </label>
                 <br></br>
                 <input type="text" id="UUsername" name="UUsername" placeholder="Michael" required></input>
                 <br></br>
                 <label for="UScore">Change Score: </label>
                 <br></br>
                 <input type="number" id="UScore" name="UScore" placeholder="150"></input>
                 <br></br><br></br>
                 <input type="submit" value="Update"></input>
              </form>
            </body>
            </span>
            
            <span class="col-sm-3">
        <h3>Delete User</h3>
        <body>
              <br></br>
              <form id="DUser">
                 <label for="DUsername">Username: </label>
                 <br></br>
                 <input type="text" id="DUsername" name="DUsername" placeholder="Michael" required></input>
                 <br></br><br></br>
                 <input type="submit" value="Delete"></input>
              </form>
              </body>
            </span>
            </span>
        </div>
            </>
            );
    }
}