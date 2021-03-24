const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const app = express()


const port = process.env.PORT
    // Import routes
const userRoute = require('./routes/usersRoute')

// Db conn
mongoose.connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    .then(() => console.log("Bb Connected"))
    .catch((error) => console.log(error))

app.use('/api/users', userRoute)


app.listen(port, () => { console.log(`Our application is running on port ${port}`) })