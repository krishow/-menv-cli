const express = require('express')
const app = express()
const port = 3000
const propertyRouter = require('./routes/propertyRouter')


const cors = require('cors')
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.use(bodyParser.json())


app.use(propertyRouter).listen(port, () => console.log(`Example app listening on port ${port}!`))




