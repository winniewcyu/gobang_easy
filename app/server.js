const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

//const Game = require('./src/backend/GameHandlers.js');

// TODO: link with db
mongoose.connect('mongodb://localhost:27017/myapp', {useNewUrlParser: true, useUnifiedTopology: true});

const User = mongoose.model('User', new mongoose.Schema({
  userType: String,
  name: String,
  //email: String,
  password: String,
  online: Boolean,          //0: before login & after logout, 1: after login & before logout
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
  Player1Records: [{
    type : Number,
    default : 100
  }],
  Player2Records: [{
    type : Number,
    default : 100
  }],
  Winner: String,
  Movement: [{
    type : Array,
    default : []
  }]
}));

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
      const user = new User({userType: "User", name, password: hashedPassword, online: false, score: 100});
      user.save();
      res.status(200).json({success: true});
    }
  })
});

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
//C
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


//R
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
      //"email: "+ data.email + "\n" +
      "(Hashed) password: "+ data.password + "\n" +
      "userType: "+ data.userType + "\n" +
      "online: "+ data.online + "\n" +
      "score: "+ data.score);
      
      res.contentType('text/plain')
      res.status(200).send(RMess);

    }
  })
})

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
      //"email: "+ data[i].email + "\n" +
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


//U
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


//D
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
*/
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
2. Read users who are online
*/
app.get('/onlineuser',  (req, res) => {
  let RMess = "";
  User.find({online: true})
  .then((data)=>{
    if(!data){
      RMess += ('No users are online');
      res.contentType('text/plain');
      res.status(404).send(RMess);
    }
    else{
      for (let i=0; i<data.length; i++)
      RMess += (i+1 +". username: "+ data[i].name)
      res.contentType('text/plain')
      res.status(200).send(RMess);

    }
  })
})

/* backend functions:
Initialized GameRecord (Start playing with machine private mode)*/
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
    Player1Records: 100,
    Player2Records: 100,
    });

    //Saving this to database
    NewMachinePrivate
    .save()
    .then(() => {
      console.log("Start Game (Play with machine private mode)");
      res.contentType('text/plain')
      res.status(200).send("Create a game successfully");
    })
    .catch((error) => {
      console.log("Error exists in starting game");
      console.log(error);
      res.contentType('text/plain')
      res.status(400).send("Error exists creating a game");
    });

})

// Initialized GameRecord (Start playing with machine public mode)
app.put('/game/machinepublic', (req, res) => {
  const username = req.body.username;
  const timestamp = Date.now();
  const date = new Date(timestamp);
  const ExistingTime = date.toLocaleString();
  const RoomID = Math.floor(Math.random() * (29999 - 20000 + 1)) + 20000;
  let NewMachinePrivate = new Game({
    GameID: RoomID,            
    GameMode: "Public",
    Status: true,            
    StartTime: ExistingTime,
    Player1: username,
    Player2: "Machine",
    Player1Records: 100,
    Player2Records: 100,
    });

    //Saving this to database
    NewMachinePrivate
    .save()
    .then(() => {
      console.log("Start Game (Play with machine public mode)");
      res.contentType('text/plain')
      res.status(200).send("Create a game successfully");
    })
    .catch((error) => {
      console.log("Error exists in starting game");
      console.log(error);
      res.contentType('text/plain')
      res.status(400).send("Error exists creating a game");
    });

})

// Initialized Gameboard (Start playing with human private mode)

// Initialized Gameboard (Start playing with human public mode after pairing)

// Pairing 

// Check the existing room id
app.get('/existingroom',  (req, res) => {
  const RoomID = req.body.RoomID;
  let RMess = "";
  Game.findOne({GameID: RoomID, GameMode: "Public", Status: true})
  .then((data)=>{
    if(!data){
      RMess += ('This Room ID is not existed');
      res.contentType('text/plain');
      res.status(404).send(RMess);
    }
    else{
      RMess += ("This Room ID is existed");
      res.contentType('text/plain')
      res.status(200).send(RMess);

    }
  })
})

// Read Game History of a user

// End the game (Win/Someone ends earlier)


// 



app.listen(8080, () => console.log('Server running on http://localhost:8080'));