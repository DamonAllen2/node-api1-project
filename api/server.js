// BUILD YOUR SERVER HERE
const express = require('express')
const Users = require('./users/model')
const server = express();
server.use(express.json())

server.get('/api/users', async (req, res)=> {
    try { 
        const users = await Users.find();
        res.status(200).json(users)
    } catch (err) {
        res.status(500).json({ message: `The users information could not be retrieved` })
    }
})

server.get('/api/users/:id', async (req, res) => {
    const { id } = req.params;
    const user = await Users.findById(id)
    console.log(user)
    try {
        if(user === undefined) {
            res.status(404).json({ message: "The user with the specified ID does not exist" })
        } else {
            res.status(200).json(user)
        }
    } catch(err) {
        res.status(500).json({ message: "The user information could not be retrieved" })
    }
})

server.post('/api/users',  (req, res) => {
    const user = req.body;
    console.log(user)
        if(!user.name || !user.bio) {
            res.status(400).json({ message: "Please provide name and bio for the user" }) 
        } else {
            Users.insert(user)
            .then(newUser => {
                res.status(201).json(newUser)
            })
            .catch(err => {
                res.status(500).json({ message: "There was an error while saving the user to the database" })
            })
        }
})

server.delete('/api/users/:id', async (req, res) => {
    const { id } = req.params;
    const user = await Users.findById(id);
    try {
        if(!user) {
            res.status(404).json({ message: "The user with the specified ID does not exist" })
        } else {
            const updatedUsers = Users.remove(id);
            res.status(200).json(user);
        }
    } catch(err) {
        res.status(500).json({ message: "The user could not be removed" })
    }
})

server.put('/api/users/:id', async (req, res) => {
    const { id } = req.params;
    const newUser = req.body;
    console.log(newUser)
    const user = await Users.findById(id);
    try {
    if(!user) {
        res.status(404).json({ message: "The user with the specified ID does not exist" })
    } else {
        if (!newUser.name || !newUser.bio) {
        res.status(400).json({ message: "Please provide name and bio for the user" })
    } else {
        const updatedUser = await Users.update(id, newUser);
        res.status(200).json(updatedUser)
    }}  
    
} catch(err) {
    res.status(500).json({ message: "The user information could not be modified" })
}
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
