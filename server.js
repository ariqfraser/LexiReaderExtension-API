// const admin = require('firebase-admin');

// const serviceAccount = require('./firebase_adminsdk.json');

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
// });

// const db = admin.firestore()

const express = require('express');
const port = process.env.PORT || 8080;
const app = express();
const languageDB = require('./json/_languageDB.json');

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});

app.get('/', (req, res) => {
    res.status(200).send('Connected to server');
});

app.post('/login', (req, res) => {
    res.status(200).send('Posted to login');
});

app.get('/lang', (req, res) => {
    console.log(req.body);
    console.log('requested languages');
    res.status(200).send(languageDB);
});

app.get('/lang/:lang', (req, res) => {
    const { lang } = req.params;
    let isFound = false;
    for (let i of languageDB) {
        if (i.code === lang) {
            console.log(i.code);
            isFound = true;
            const wordDB = require(`./json/lang/${lang.toLowerCase()}.json`);
            res.status(200).send(wordDB);
        }
    }
    if (!isFound)
        res.status(400).send(`Not currently supporting language code: ${lang}`);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
