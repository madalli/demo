const express = require('express')
const logger = require('morgan')
const app = express()

const users = [{name: 'Alice'}]

app.get('/', (req, res) => res.send('Hello World!'))
app.get('/users', (req, res) => res.json(users))

app.listen(3000, () => console.log('running'))