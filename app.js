const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const app = express();
require('dotenv').config();

// Initialize Firebase Admin SDK
const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'), // Fixes newline issue in private key
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    }),
  });

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });
const db = admin.firestore();

// Enable CORS
app.use(cors());


// Middleware to parse JSON requests
app.use(express.json());

// GET: Fetch all users
app.get('/api/users', async (req, res) => {
    try {
        const usersRef = db.collection('users');
        const snapshot = await usersRef.get();
        if (snapshot.empty) {
            return res.status(404).send('No users found');
        }

        const users = [];
        snapshot.forEach(doc => {
            users.push({ id: doc.id, ...doc.data() });
        });

        res.json(users);
    } catch (error) {
        res.status(500).send('Error fetching users: ' + error.message);
    }
});

// GET: Fetch a single user by ID
app.get('/api/users/:id', async (req, res) => {
    try {
        const userRef = db.collection('users').doc(req.params.id);
        const doc = await userRef.get();
        if (!doc.exists) {
            return res.status(404).send('User not found');
        }

        res.json({ id: doc.id, ...doc.data() });
    } catch (error) {
        res.status(500).send('Error fetching user: ' + error.message);
    }
});

// POST: Create a new user
app.post('/api/users', async (req, res) => {
    try {
        const newUser = {
            name: req.body.name,
            userType: req.body.userType,
            email: req.body.email,
            discipline: req.body.discipline
        };
        const userRef = await db.collection('users').add(newUser);
        res.status(201).json({ id: userRef.id, ...newUser });
    } catch (error) {
        res.status(500).send('Error creating user: ' + error.message);
    }
});

// PUT: Update an existing user
app.put('/api/users/:id', async (req, res) => {
    try {
        const userRef = db.collection('users').doc(req.params.id);
        const doc = await userRef.get();
        if (!doc.exists) {
            return res.status(404).send('User not found');
        }

        const updatedUser = {
            name: req.body.name,
            userType: req.body.userType,
            email: req.body.email,
            discipline: req.body.discipline,
        };
        await userRef.update(updatedUser);
        res.json({ id: req.params.id, ...updatedUser });
    } catch (error) {
        res.status(500).send('Error updating user: ' + error.message);
    }
});

// DELETE: Remove a user
app.delete('/api/users/:id', async (req, res) => {
    try {
        const userRef = db.collection('users').doc(req.params.id);
        const doc = await userRef.get();
        if (!doc.exists) {
            return res.status(404).send('User not found');
        }

        await userRef.delete();
        res.json({ message: 'User deleted' });
    } catch (error) {
        res.status(500).send('Error deleting user: ' + error.message);
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});