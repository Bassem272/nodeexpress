import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import fs from 'fs/promises';

// Set up express app
const app = express();
app.use(express.json());

// Define secret key for JWT
// const secretKey = '7815696ecbf1c96e6894b779456d330e';

// Define route to handle user registration
app.post('/register', async (req, res) => {
  try {
    // Extract username and password from request body
    const { username, password } = req.body;

    // Check if user already exists
    const users = await getUsers();
    if (users.find(user => user.username === username)) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // Add new user to database
    const newUser = { username, password };
    users.push(newUser);
    await saveUsers(users);

    // Return success response
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Define route to handle user login
app.post('/login', async (req, res) => {
  try {
    // Extract username and password from request body
    const { username, password } = req.body;

    // Check if user exists and password is correct
    const users = await getUsers();
    const user = users.find(user => user.username === username && user.password === password);
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Generate JWT token and send it in the response
   // const token = jwt.sign(user,secretKey);
   //var token = jwt.sign(user, 'shhhhh')

   const token =jwt.sign(
    user
  , 'shhhhh', { expiresIn: '1m' });

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
// ```js
// verify a token symmetric - synchronous
// var decoded = jwt.verify(token, 'shhhhh');
// console.log(decoded.foo) // bar

// var jwt = require('jsonwebtoken');
// var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
// ```
// Define route to handle data retrieval
app.get('/data', authenticateToken, (req, res) => {
  try {
    // Return sample data
    res.status(200).json({ message: 'Sample data retrieved' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Define middleware to authenticate JWT token
function authenticateToken(req, res, next) {
  // Get JWT token from request header
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  // If token is not provided, return unauthorized response
  if (!token) {
    return res.status(401).json({ message: 'Token not provided' });
  }
  var decoded = jwt.verify(token, 'shhhhh');
  console.log(decoded.iat) 
  // Verify token and extract username
//   jwt.verify(token, secretKey, (error, decoded) => {
//     if (error) {
//       return res.status(403).json({ message: 'Invalid token' });
//     }
//     req.username = decoded.username;
    next();
  };


// Helper functions to read and write user data to file
async function getUsers() {
  const data = await fs.readFile('users.json');
  return JSON.parse(data);
};

async function saveUsers(users) {
  const data = JSON.stringify(users);
  await fs.writeFile('users.json', data);
};

// Start server
app.listen(5000, () => {
  console.log('Server listening on port 5000');
});
