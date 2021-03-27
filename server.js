const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator')



//Config mongoDB
require('dotenv').config()
const app = express()


// Import routes
const authRoutes = require('./routes/authRoute')
const userRoutes = require('./routes/userRoute')
const categoryRoutes = require('./routes/categoryRoute')
const productRoutes = require('./routes/productRoute')

// Db conn
mongoose.connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Db Connected"))
    .catch((error) => console.log(error))


//Middlewares
app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use(expressValidator())


//Routes Middelewares   
app.use('/api', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/product', productRoutes)



const port = process.env.PORT
app.listen(port, () => { console.log(`Our application is running on port ${port}`) })