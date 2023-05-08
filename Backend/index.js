const connectToMongo = require('./db') 
const express = require('express')
var cors = require('cors')

connectToMongo()
const port = 5000
const app = express()

app.use(express.json())
app.use(cors())
app.use('/api/auth', require('./routes/auth'))
app.use('/api/experiments', require('./routes/experiments'))

app.listen(port, function () {
    console.log(`backend listening at http://localhost:${port}`)
})