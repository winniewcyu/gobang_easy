const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const app = express();
app.use(bodyParser.json());

// TODO: link with db
mongoose.connect('mongodb://localhost:27017/myapp', {useNewUrlParser: true, useUnifiedTopology: true});

const User = mongoose.model('User', new mongoose.Schema({
  userType: String,
  name: String,
  email: String,
  password: String,
}));

app.post('/register', async (req, res) => {
  const {userType, name, email, password} = req.body;

  const existingUser = await User.findOne({email});
  if (existingUser) {
    return res.status(400).json({error: 'Username already exists'});
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({userType, name, email, password: hashedPassword});
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

app.listen(8080, () => console.log('Server running on http://localhost:8080'));