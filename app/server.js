const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
const Game = require('./src/backend/GameHandlers.js');

mongoose.connect('mongodb://localhost:27017/myapp', {useNewUrlParser: true, useUnifiedTopology: true});

const User = mongoose.model('User', new mongoose.Schema({
  userType: String,
  name: String,
  email: String,
  password: String,
  online: Boolean,
  score: Number,
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
  const {userType, name, email, password} = req.body;

  const existingUser = await User.findOne({email});
  if (existingUser) {
    return res.status(400).json({error: 'Username already exists'});
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({userType, name, email, password: hashedPassword, online: true, score: 100, highestscore: 100});
  await user.save();

  res.json({success: true});
});

app.post('/login', async (req, res) => {
  const {userType, password} = req.body;

  const user = await User.findOne({userType});
  if (!user) {
    return res.status(400).json({error: 'Invalid username or password'});
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(400).json({error: 'Invalid username or password'});
  }

  // Generate and return JWT token...
});

//CRUD stored users
//C
app.post('/adminuser/', (req, res) => {
  const username = req.body.username;
  const password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
  let CMess = "";
  User.findOne({name:{ $eq: username }, userType: "Admin" })
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
      "score: "+ data[i].score
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
  User.findOne({ name: username, userType: "User" })
  .then((data)=>{
    if(!data){
      UMess += ('User is not created before OR This user is an admin');
      res.contentType('text/plain');
      res.status(404).send(UMess);
    }
    else{
        User.findOneAndUpdate(
          {name: username, userType: "User" },
          {score: newscore},
          {new: true})
      UMess += ('You have successfully update an user score');
      res.contentType('text/plain');
      res.status(200).send(UMess);

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
          res.status(204).send('The deleted data is:', data);
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
          .map((user) => `${user.name}\n${user.score}`)
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


app.listen(8080, () => console.log('Server running on http://localhost:8080'));