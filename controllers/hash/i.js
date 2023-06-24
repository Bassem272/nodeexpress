import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const app = express();
app.use(express.json());
app.get('/', async (req, res) => {
    
      
  res.status(201).json({ message: 'User registered successfully', });
      // Hash the password
     
  
      // Store the user in the database (e.g., MongoDB)
      // Your implementation here
    
  
      
    
});
  
// User registration
app.post('/', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Store the user in the database (e.g., MongoDB)
    // Your implementation here
    const storedUser = {
      username,
      email,
      hashedPassword,
    };

    res.status(201).json({ message: 'User registered successfully', user: storedUser });
  } catch (error) {
    console.error('Error during user registration:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// User login
app.post('/users/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Retrieve the user from the database based on the username
    // Your implementation here

    // Compare the provided password with the stored hashed password
    const passwordsMatch = await bcrypt.compare(password, storedUser.hashedPassword);
    const userMatch = await bcrypt.compare(username, storedUser.username);

    if (!passwordsMatch || !userMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate and return a JWT token
    const token = jwt.sign({ userId: storedUser.id }, 'secretKey');
    res.json({ token });
  } catch (error) {
    console.error('Error during user login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Protected route example
app.get('/protected', verifyToken, (req, res) => {
  // Accessible only with a valid token
  res.json({ message: 'Protected route accessed successfully' });
});

// Verify JWT token middleware
function verifyToken(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  jwt.verify(token, 'secretKey', (error, decoded) => {
    if (error) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    // Attach the decoded token to the request object for further use
    req.userId = decoded.userId;
    next();
  });
}

// Start the server
app.listen(5000, () => {
  console.log('Server is listening on port 5000');
});
