const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const port = 4000;
const User = require('./Models/userModel');
const jwt = require('jsonwebtoken');
const WebSocket = require('ws');
const cors = require("cors");
require("dotenv").config();

mongoose.set('strictQuery', false);

app.use(bodyParser.json());
app.use(express.json());

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));


//============== Connection ==================

mongoose.connect(process.env.MONGO_CONNECTION, { useNewUrlParser: true })
    .then(() => {
        console.log("MongoDB is Connected..")
    }).catch(err => {
        console.log(err.message);
    })

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
    console.log('Database connected!');
});

// ================= Register ================

app.post('/register', async (req, res) => {
    const { username, password, email } = req.body;

    try {
        let savedData = await User.create(req.body);
        res.status(201).send({ data: savedData });

    } catch (error) {
        res.status(400).send(error);
    }
});

//================ Login =============

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(400).send('User not found');
        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).send('Invalid credentials');
        const token = jwt.sign({ id: user._id }, 'process.env.SECRET', { expiresIn: '5h' });
        res.status(200).json({ token,username });
    } catch (error) {
        res.status(400).send(error);
    }
});

//============ Port ==============

const server = app.listen(port, () => {
    console.log(`Server running on port ${port} ...`);
});

//============ Web Socket Connection =========
const wss = new WebSocket.Server({ server });
wss.on('connection', (ws, req) => {
    const t = JSON.stringify(req);
    const t1 = JSON.parse(t).url;
    const token = t1.split('=')[1];
    if (token === undefined) {
        ws.close();
    } else {

        jwt.verify(token, 'process.env.SECRET', (err, decoded) => {
            
            if (err) {
                ws.close();
            } else {
                ws.userId = decoded.id;
                //console.log(ws.userId + " "+ decoded.id);
            }
        });
    }
    ws.on('message', (message) => {
        const parseData = JSON.parse(message);
        //ws.send(JSON.stringify(parseData));
        
        wss.clients.forEach((client) => {

            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(parseData));
            }
        });
    });

    ws.on('close', () => {
        console.log('WebSocket disconnected');
    });
});

