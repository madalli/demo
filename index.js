const express = require('express')
const logger = require('morgan')
const app = express()

const users = [
    {id: 1, name: 'Alice1'}, 
    {id: 2, name: 'Alice2'}, 
    {id: 3, name: 'Alice3'}
]

app.get('/', (req, res) => res.send('Hello World!'))
app.get('/users', (req, res) => {
    req.query.limit = req.query.limit || 10
    const limit = parseInt(req.query.limit, 10)

    if (Number.isNaN(limit)) {
        res.status(400).end()
    } else {
        res.json(users.slice(0, limit))
    }
})

app.get('/users/:id', (req, res) => {
    const id = parseInt(req.params.id, 10)
    if (Number.isNaN(id)) {
        return res.status(400).end()
    } 
    const user = users.filter(user => user.id === id)[0]
    if (!user) {
        return res.status(404).end()
    }
    res.json(user)
})

module.exports = app