const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory data store
let users = [];
let idCounter = 1;

// CREATE - Add a new user
app.post('/users', (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
    }
    const user = {
        id: idCounter++,
        name,
        email
    };
    users.push(user);
    res.status(201).json(user);
});

// READ - Get all users
app.get('/users', (req, res) => {
    res.json(users);
});

// READ - Get a single user by ID
app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
});

// UPDATE - Update a user by ID
app.put('/users/:id', (req, res) => {
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
    if (userIndex === -1) {
        return res.status(404).json({ error: 'User not found' });
    }
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
    }
    users[userIndex] = { id: parseInt(req.params.id), name, email };
    res.json(users[userIndex]);
});

// DELETE - Delete a user by ID
app.delete('/users/:id', (req, res) => {
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
    if (userIndex === -1) {
        return res.status(404).json({ error: 'User not found' });
    }
    const deletedUser = users.splice(userIndex, 1)[0];
    res.json(deletedUser);
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});