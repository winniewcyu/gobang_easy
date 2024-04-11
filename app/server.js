const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/myapp');

const User = mongoose.model('User', new mongoose.Schema({
  userType: String,
  name: String,
  email: String,
  password: String,
  online: Boolean,
  score: Number
}));

const Pairing = mongoose.model('Pairing', new mongoose.Schema({
  name: String
}));

const Game = mongoose.model('Game', new mongoose.Schema({
  GameID: Number,            //for joining the room by roomid
  GameMode: String,
  Status: Boolean,            //for joining the room (1:Ongoing, 0:Ended)
  StartTime: String,
  FinishTime: String,
  Player1: String,
  Player2: String,
  Player1Records: {
    type : Number,
    default : 0
  },
  Player2Records: {
    type : Number,
    default : 0
  },
  Winner: String,
  Movement: [{
    type : Array,
    default : []
  }]
}));


//Tested
User.findOne({ userType: "Admin" })
.then((data)=>{
    if(!data)
    {
        let Admin = new User({
            name: "admin",
            password: bcrypt.hashSync("admin", bcrypt.genSaltSync(10)),
            userType: "Admin",
            online: false
            });
        
            //Saving this to database
            Admin
            .save()
            .then(() => {
              console.log("Default admin account is created");
            })
            .catch((error) => {
              console.log("Error exists in creating admin account");
              console.log(error);
            });
    }
    else console.log("Default admin account is already created");
})

//Tested
app.post('/register', async (req, res) => {
  const {name, email, password} = req.body;

  User.findOne({name:name})
  .then((data)=>{
    if(data){
    console.log("This username is created before:",data);
    res.status(404).json({error: 'Username already exists, please create another one'});
    }
    else {
      const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
      const user = new User({userType: "User", name, email, password: hashedPassword, online: false, score: 100});
      user.save();
      res.status(200).json({success: true});
    }
  })
});

//Tested
app.post('/login', async (req, res) => {
  const {userType, userName, password} = req.body;

  User.findOne({userType: userType, name:userName})
  .then((data)=>{
    if(!data){
      res.status(404).json({error: 'Invalid username or password'});
    }
    else{
      bcrypt.compare(password, data.password)
      .then(function(result){
        if (result === false) {
          res.status(400).json({error: 'Invalid username or password'});
        }
        else{
          User.findOneAndUpdate(
            {userType: userType, name: userName},
            {online: true},
            {new: true})
          .then((data)=>{
            // Generate and return JWT token...
            const token = userName;
            res.status(200).json({token: token});
      })}
  })
}
})
});

//Tested
app.post('/logout', async (req, res) => {
  const {userName}= req.body;
  User.findOneAndUpdate(
    {name: userName},
    {online: false},
    {new: true})
  .then((data)=>{
    const CMess = ('Log out successfully');
    res.contentType('text/plain');
    res.status(200).send(CMess);
  })
})
//CRUD stored users
//C //Tested
app.post('/adminuser/', (req, res) => {
  const username = req.body.username;
  const password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
  let CMess = "";
  User.findOne({userType: "Admin", name:{ $eq: username }})
  .then((data)=>{
    if(data){
      CMess += ('This Admin User is already created before');
      res.contentType('text/plain');
      res.status(404).send(CMess);
    }
    else{
      let newUser = new User({
        name: username,
        password: password,
        userType: "Admin"
        });
    
        //Saving this to database
        newUser
        .save()
        .then(() => {
          console.log("a new admin user account is created");
        })
        .catch((error) => {
          console.log("fail to create the user account");
          console.log(error);
        });

      CMess += ('A new admin user account is created');
      res.contentType('text/plain');
      res.status(200).send(CMess);

    }
  })


})


//R //Tested
app.get('/user/:username',  (req, res) => {
  const username = req.params.username;
  let RMess = "";
  User.findOne({name:{ $eq: username }})
  .then((data)=>{
    if(!data){
      RMess += ('User is not created before');
      res.contentType('text/plain');
      res.status(404).send(RMess);
    }
    else{
      RMess += ("username: "+ data.name + "\n" +
      "email: "+ data.email + "\n" +
      "(Hashed) password: "+ data.password + "\n" +
      "userType: "+ data.userType + "\n" +
      "online: "+ data.online + "\n" +
      "score: "+ data.score);
      
      res.contentType('text/plain')
      res.status(200).send(RMess);

    }
  })
})

//Tested
app.get('/alluser',  (req, res) => {
  let RMess = "";
  User.find({})
  .then((data)=>{
    if(!data){
      RMess += ('No users created before');
      res.contentType('text/plain');
      res.status(404).send(RMess);
    }
    else{
      for (let i=0; i<data.length; i++)
      RMess += (i+1 +". username: "+ data[i].name + "\n" +
      "email: "+ data[i].email + "\n" +
      "(Hashed) password: "+ data[i].password + "\n" +
      "userType: "+ data[i].userType + "\n" +
      "online: "+ data[i].online + "\n" +
      "score: "+ data[i].score + "\n"
      )

      res.contentType('text/plain')
      res.status(200).send(RMess);

    }
  })
})


//U //Tested
app.put('/user/:username', (req, res) => {
  const username = req.params.username;
  const newscore = req.body.newscore;
  let UMess = "";
  User.findOne({ userType: "User", name: username})
  .then((data)=>{
    if(!data){
      UMess += ('User is not created before OR This user is an admin');
      res.contentType('text/plain');
      res.status(404).send(UMess);
    }
    else{
        User.findOneAndUpdate(
          {userType: "User", name: username},
          {score: newscore},
          {new: true})
        .then((data)=>{
        console.log('the updated document is:', data);
        UMess += ('You have successfully update an user score');
        res.contentType('text/plain');
        res.status(200).send(UMess);
        })
    }
  })


})


//D //Tested
app.delete('/user/:username', (req, res) => {
  const username = req.params.username;
  User.find({name: {$eq: username}})
  .then((data) => {
    if (data === ""){
      res.contentType('text/plain');
      res.status(404).send("no such data");
    }
  
    else {
      User.findOneAndDelete(
        { name: {$eq: username} }, 
        )
        .then((data) => {
          res.contentType('text/plain');
          res.status(200).send("A user is deleted");
        })
        .catch((error) => console.log(error));
        
    }

})
})

/* Backend functions to be added:
1. Read users with top 5 scores
*/ //Tested
app.get('/top5user',  (req, res) => {
  User.find({userType: "User"}).sort({ score: -1 }).limit(5).exec()
  .then((data)=>{
    if(!data){
      const RMess = 'No users created before';
      res.contentType('text/plain');
      res.status(404).send(RMess);
    }
    else{
      const RMess = data
          .map((user, index) => `${user.name}\n${user.score}`)
          .join('\n');
        res.contentType('text/plain');
        res.status(200).send(RMess);

    }
    
  })
  .catch((error) => {
    console.log('Error occurred:', error);
    const RMess = 'An error occurred while fetching the top 5 users.';
    res.contentType('text/plain');
    res.status(500).send(RMess);
  })
})

/*
2. Check whether a particular user is online and not currently playing a game
*/
app.get('/onlineuser',  (req, res) => {
  const username = req.body.username;
  let RMess = "";
  User.findOne({userType: "User", name: username, online: true})
  .then((data)=>{
    if(!data){
      RMess += ('The user doesnt exists or offline');
      res.contentType('text/plain');
      res.status(400).send(RMess);
    }
    else{
      Game.findOne({$or: [{ Player1: username }, { Player2: username }], Status: true})
      .then((data1)=>{
        if(!data1){
          res.contentType('text/plain')
          res.status(200);
        }
        else {
          RMess += ('The user is busy now');
          res.contentType('text/plain');
          res.status(401).send(RMess);
        }
      })
    }
  })
})

/* backend functions:
3. Initialized GameRecord (Start playing with machine private mode)*/
app.put('/game/machineprivate', (req, res) => {
  const username = req.body.username;
  const timestamp = Date.now();
  const date = new Date(timestamp);
  const ExistingTime = date.toLocaleString();
  const RoomID = Math.floor(Math.random() * (19999 - 10000 + 1)) + 10000;
  let NewMachinePrivate = new Game({      
    GameID: RoomID,      
    GameMode: "Private",
    Status: true,            
    StartTime: ExistingTime,
    Player1: username,
    Player2: "Machine",
    Player1Records: 0,
    Player2Records: 0,
    });

    //Saving this to database
    NewMachinePrivate
    .save()
    .then(() => {
      console.log(RoomID);
      res.contentType('text/plain')
      res.status(200).send("RoomID: "+RoomID);
    })
    .catch((error) => {
      console.log("Error exists in starting game");
      console.log(error);
      res.contentType('text/plain')
      res.status(400).send("Error exists creating a game");
    });

})

// 4. Initialized GameRecord (Start playing with machine public mode)
app.put('/game/machinepublic', (req, res) => {
  const username = req.body.username;
  const timestamp = Date.now();
  const date = new Date(timestamp);
  const ExistingTime = date.toLocaleString();
  const RoomID = Math.floor(Math.random() * (29999 - 20000 + 1)) + 20000;
  let NewMachinePublic = new Game({ 
    GameID: RoomID,           
    GameMode: "Public",
    Status: true,            
    StartTime: ExistingTime,
    Player1: username,
    Player2: "Machine",
    Player1Records: 0,
    Player2Records: 0,
    });

    //Saving this to database
    NewMachinePublic
    .save()
    .then(() => {
      console.log(RoomID);
      res.contentType('text/plain')
      res.status(200).send("Create a game successfully " + RoomID);
    })
    .catch((error) => {
      console.log("Error exists in starting game");
      console.log(error);
      res.contentType('text/plain')
      res.status(400).send("Error exists in starting game");
    });

})

// 5. Initialized Gameboard (Start playing with human private mode before inviting)
app.put('/game/humanprivate', (req, res) => {
  const username = req.body.username;
  const timestamp = Date.now();
  const date = new Date(timestamp);
  const ExistingTime = date.toLocaleString();
  const RoomID = Math.floor(Math.random() * (39999 - 30000 + 1)) + 30000;
  let NewHumanPrivate= new Game({ 
    GameID: RoomID,           
    GameMode: "Private",
    Status: true,            
    StartTime: ExistingTime,
    Player1: username,
    Player2: undefined,
    Player1Records: 0,
    Player2Records: 0,
    });

    //Saving this to database
    NewHumanPrivate
    .save()
    .then(() => {
      console.log(RoomID);
      res.contentType('text/plain')
      res.status(200).send("Create a game successfully " +RoomID);
    })
    .catch((error) => {
      console.log("Error exists in starting game");
      console.log(error);
      res.contentType('text/plain')
      res.status(400).send("Error exists creating a game");
    });

})

// 6. Initialized Gameboard (Start playing with human public mode after pairing)
app.put('/game/humanpublic', (req, res) => {
  const username = req.body.username;
  const anotherplayer = req.body.anotherplayer;
  const timestamp = Date.now();
  const date = new Date(timestamp);
  const ExistingTime = date.toLocaleString();
  const RoomID = Math.floor(Math.random() * (49999 - 40000 + 1)) + 40000;
  let NewHumanPublic = new Game({ 
    GameID: RoomID,           
    GameMode: "Public",
    Status: true,            
    StartTime: ExistingTime,
    Player1: username,
    Player2: anotherplayer,
    Player1Records: 0,
    Player2Records: 0,
    });

    //Saving this to database
    NewHumanPublic
    .save()
    .then(() => {
      console.log(RoomID);
      res.contentType('text/plain')
      res.status(200).send("Create a game successfully " + RoomID);
    })
    .catch((error) => {
      console.log("Error exists in starting game");
      console.log(error);
      res.contentType('text/plain')
      res.status(400).send("Error exists creating a game");
    });

})

let dataDeleted = false; // Flag to track data deletion
// 7. Pairing for public human
app.post('/pairing', async (req, res) => {
  const username = req.body.username;
  Pairing.findOne({})
  .then((data)=>{
    if(!data){
      let newPair = new Pairing({
        name: username
        });
    
        //Saving this to database
        newPair
        .save()
        .then(() => {
          console.log("You are added to Waiting Room");
          res.contentType('text/plain');
          res.status(201).send("Waiting Room");
        })
        .catch((error) => {
          console.log("You are failed to added to Waiting Room");
          console.log(error);
        });
    }
    else{
      dataDeleted = true;
      Pairing.findOneAndDelete({})
        .then((data) => {
          res.contentType('text/plain');
          res.status(200).send(data.name);
        })
        .catch((error) => console.log(error));

    }
  })
})

// 8. Give up Pairing
app.delete('/giveuppairing', async (req, res) => {
  Pairing.findOneAndDelete({})
    .then((data) => {
      let Mess = "You have given up pairing with opponent";
      res.contentType('text/plain');
      res.status(201).send(Mess);
    })
    .catch((error) => console.log(error));
})

// 9. Check whether a room id is valid or existed
app.get('/existingroom/:RoomID',  (req, res) => {
  const RoomID = req.params.RoomID;
  let RMess = "";
  Game.findOne({GameID: RoomID, GameMode: "Private", Status: true})
  .then((data)=>{
    if(!data){
      RMess += ('This Room ID is not existed or available');
      res.contentType('text/plain');
      res.status(400).send(RMess);
    }
    else{
      RMess += ("You are now joining the room" + RoomID);
      res.contentType('text/plain')
      res.status(200).send(RMess);

    }
  })
})

// 10. Read Game History of a user
app.get('/game/history/:username', (req, res) => {
  const username = req.params.username;
  let RMess = "";

  Game.find({ $or: [{ Player1: username }, { Player2: username }], Status: false})
    .then((data) => {
      if (data.length === 0) {
        RMess += 'You have no gaming history';
        res.contentType('text/plain');
        res.status(400).send(RMess);
      } else {
        for (let i = 0; i < data.length; i++) {
          RMess += (
            data[i].StartTime + "\n" +
            data[i].FinishTime + "\n" +
            data[i].Player1 + "\n" + data[i].Player2 + "\n" +
            data[i].Winner + "\n" +
            data[i].Player1Records + "\n" + data[i].Player2Records + "\n" +
            data[i].Movement + "\n"
          );
        }
        res.contentType('text/plain');
        res.status(200).send(RMess);
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('An error occurred while retrieving game history');
    });
});

// 11. Someone wins/draw (record movements and result)
app.post('/game/ends', async (req, res) => {
  const RoomID = req.body.RoomID;
  const winner = req.body.winner;
  const Player1Records = req.body.Player1Records;
  const Player2Records = req.body.Player2Records;
  const Movement = req.body.Movement;
  const timestamp = Date.now();
  const date = new Date(timestamp);
  const ExistingTime = date.toLocaleString();
  let Mess = "";
  Game.findOneAndUpdate(
    {GameID: RoomID},
    {Status: 0, FinishTime: ExistingTime, Player1Records: Player1Records, 
      Player2Records: Player2Records, Winner:winner, Movement: Movement},
    {new: true})
  .then((data)=>{
    console.log("Update the Game Record" + RoomID);
    Mess += "Update the Game Record" + RoomID + "\n";
    User.findOneAndUpdate(
      {userType: "User", name: data.Player1},
      {$push: { score: Player1Records }},
      {new: true})
    .then((dataU1)=>{
      console.log("Update the Player 1's score");
      Mess += "Update the Player 1's score\n";
      User.findOneAndUpdate(
        {userType: "User", name: data.Player2},
        {$push: { score: Player2Records }},
        {new: true})
      .then((dataU2)=>{
        console.log("Update the Player 2's score");
        Mess += "Update the Player 2's score\n";
        res.contentType('text/plain')
        res.status(200).send(Mess);
      })
    
    })
  
  })


  
})


// 12. In Waiting Home, listen to database to pair to a opponent in public mode
app.get('/check-deletion', (req, res) => {
  if (dataDeleted) {
    res.status(200).send('Data deleted');
    dataDeleted = false; // Reset the flag
  } else {
    // Continue waiting for data deletion
    io.once('dataDeleted', () => {
      res.status(200).send('Data deleted');
    });
  }
});

io.on('connection', (socket) => {
  // Handle data deletion event
  socket.on('dataDeleted', () => {
    dataDeleted = true;
    io.emit('dataDeleted'); // Notify all connected clients
  });
});



app.listen(8080, () => console.log('Server running on http://localhost:8080'));
//http.listen(8080, () => console.log('Server listening on http://localhost:8080'));

