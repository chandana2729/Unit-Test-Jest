const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const { ObjectId } = require('mongodb');

const url = 'mongodb+srv://c-p:Ajju%4029071998@cluster0.pzbvawo.mongodb.net/mydb?retryWrites=true&w=majority';
const client = new MongoClient(url, { useNewUrlParser: true });

app.use(bodyParser.json());

app.post('/users', async (req, res) => {
    try {
        const user = req.body;
        const db = client.db('mydb');
        const collection = db.collection('mycollection');
        const result = await collection.insertOne(user);
        console.log(`User created: ${result.ops[0]._id}`);
        res.send(result.ops[0]);
    } catch (err) {
        console.error(`Error creating user: ${err}`);
        res.status(500).send('Error creating user');
    }
});

app.put('/users/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updates = req.body;
        const db = client.db('mydb');
        const collection = db.collection('mycollection');
        const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: updates });
        console.log(`User updated: ${id}`);
        res.send(result);
    } catch (err) {
        console.error(`Error updating user: ${err}`);
        res.status(500).send('Error updating user');
    }
});

app.get('/users', async (req, res) => {
    try {
        const db = client.db('mydb');
        const collection = db.collection('mycollection')
        const docs = await collection.find().toArray();
        console.log(`Retrieved ${docs.length} users`);
        res.send(docs);
    }
    catch (err) {
        console.error(`Error getting users: ${err}`);
        res.status(500).send('Error getting users')
    };
});
app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});