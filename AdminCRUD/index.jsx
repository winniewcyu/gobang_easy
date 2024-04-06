import React from 'react';

class AdminCRUD extends React.Component {
  constructor(props) {
    super(props);
    this.state = {result: "" };
    this.ReadUser = this.ReadUser.bind(this);
    this.ReadAllUser = this.ReadAllUser.bind(this);
  }

  //CRUD stored users

//C
async CreateUser(event) {
  event.preventDefault();
  const username = event.target.elements.CAdmin.value;
  const password = event.target.elements.CAdminPw.value;

  const data = {
      username: username,
      password: password
  };

  // use POST method to send a request to the server
  const response = await fetch('http://localhost:8080/adminuser', { //put your server address here
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  // render a new page if a response is received
  const resultPage = await response.text();
  alert(resultPage);
};

//R
async ReadUser(event) {
  event.preventDefault();
  const username = event.target.elements.RUsername.value;
  const response = await fetch('http://localhost:8080/user/' + username, {
    method: 'GET',
  });
  const resultPage = await response.text();
  const result = resultPage.replace(/\n/g, '<br>');
  alert("Read Successfully");
  this.setState({ result: result })
  };

async ReadAllUser(event) {
    event.preventDefault();
    const response = await fetch('http://localhost:8080/alluser', {
      method: 'GET',
    });
    const resultPage = await response.text();
    const result = resultPage.replace(/\n/g, '<br>');
    alert("Read Successfully");
    this.setState({ result: result })
    };

//U
async UpdateUser(event) {
  event.preventDefault();
  const username = event.target.elements.UUsername.value;
  const newscore = event.target.elements.UScore.value;
  
  const data = {
      username: username,
      newscore: newscore,
  };

  // use PUT method to send a request to the server
  const response = await fetch('http://localhost:8080/user/' + username, { //put your server address here
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  // render a new page if a response is received
  const resultPage = await response.text();
  alert(resultPage);
};


//D
async DeleteUser(event) {
  event.preventDefault();
  const username = event.target.elements.DUsername.value;
  const data = {
      username: username
  };

  // use Delete method to send a request to the server
  const response = await fetch('http://localhost:8080/user/'+ username, { //put your server address here
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  // render a new page if a response is received
  const resultPage = await response.text();
  alert(resultPage);
};
    render() {
        return(
        <>
        <br></br><br></br>
        <h2 style={{textAlign:"center"}}>You are now an admin and you can do CRUD now</h2>
        <ul style={{textAlign:"center"}}><a href="/admin" class="btn btn-primary">Back to Home</a></ul>
        <div class="container p-5 my-5 border" style={{textAlign:"center"}}>
          <h3 style={{textAlign:"center"}}>The "Read/Find" details will show here:</h3>
          <br></br><pre dangerouslySetInnerHTML={{ __html: this.state.result }}></pre></div>
        <div class="container p-5 my-5 border">
        <h3 style={{textAlign:"center"}}>CRUD User Data</h3>
        <br></br><br></br>
        <span class="row">
        <span class="col-sm-3">
        <h3>Create admin User</h3>
            <body>
              <br></br>
              <form id="CAdminUser"  onSubmit={this.CreateUser}>
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
              <form id="RUser"  onSubmit={this.ReadUser}>
                 <label for="RUsername">By Username: </label>
                 <br></br>
                 <input type="text" id="RUsername" name="RUsername" placeholder="Michael" required></input>
                 <br></br><br></br>
                 <input type="submit" value="Find"></input>
              </form>
            <br></br>
            <button onClick={this.ReadAllUser}>Find All</button>
            </body>
            </span>
            <span class="col-sm-3">
            <h3>Update User Info</h3>
            <body>
              <br></br>
              <form id="UUserScore"  onSubmit={this.UpdateUser}>
                 <label for="UUsername">Username: </label>
                 <br></br>
                 <input type="text" id="UUsername" name="UUsername" placeholder="Michael" required></input>
                 <br></br>
                 <label for="UScore">Change Score: </label>
                 <br></br>
                 <input type="number" id="UScore" name="UScore" placeholder="150" required></input>
                 <br></br><br></br>
                 <input type="submit" value="Update"></input>
              </form>
            </body>
            </span>
            
            <span class="col-sm-3">
        <h3>Delete User</h3>
        <body>
              <br></br>
              <form id="DUser" onSubmit={this.DeleteUser}>
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
export default AdminCRUD;


/* frontend functions:
1. 4 fetch functions for CRUD
*/