require('dotenv')
const { default: mongoose } = require('mongoose')
const monggose =require('mongoose')

const uri    = process.env.MONGO_HOST
const dbname = process.env.MONGO_DB

const connection = `${uri}/${dbname}`

mongoose.connect(connection,{
    useNewURLParser:true,
    useUnifiedTopologi:true
})