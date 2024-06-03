const express = require('express');
const path = require('path');
const sequelize = require('./db/database');
const User = require('./util/user');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static(path.join(__dirname, 'views')));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.post('/', async (req, res) => {
    try {
        const { companyName, pros, cons, rating } = req.body;
        await User.create({ companyName, pros, cons, rating });
        res.status(201).send("Review added successfully");
    } catch (error) {
        console.error("Error inserting data: ", error);
        res.status(500).send("Server error");
    }
});

app.get('/reviews', async (req, res) => {
    try {
        const reviews = await User.findAll();
        res.json(reviews);
    } catch (error) {
        console.error("Error fetching reviews: ", error);
        res.status(500).send("Server error");
    }
});

sequelize.sync().then(() => {
    const PORT = 4000;
    app.listen(PORT, () => {
        console.log(`Server running successfully on port ${PORT}`);
    });
}).catch((error) => {
    console.error("Error connecting to database: ", error);
});
