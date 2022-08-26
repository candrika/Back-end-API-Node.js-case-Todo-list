// import library
require('dotenv');
const createError = require('http-errors');
const express     = require('express');
const logger      = require('morgan');
const cookieParser= require('cookie-parser');
const path        = require('path');
const bodyParser  = require('body-parser');

// import router
const router = require('./routes');

// init core system
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended:true
}))

// init and set template engine
app.set('views', path.join(__dirname, 'views'));
// app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')

// init  cookie
app.use(cookieParser())

/**
 * init static 
 * to use other static file like css and other js
 * using express static to comunnicate library path
 */
app.use('/static',express.static(path.join(__dirname,'public')))

// set up router in core system
app.use('/',router);

// set default middleware if page/request is not found
app.use((req, res, next)=>{
    res.status(404).send({
        status:false,
        message:'Page our endpoint not found'
    });
    console.log(req.app.get('env'));
    next()
})

// set listener
app.use(function(err, req, res, next){
    // set locals, only providing error in development
    // res.locals.message = err.message;
    res.locals.error =req.app.get('env') === 'development' ? err : {}
    // render the error page
    res.status(500).send({
        status:false,
        message:err.message,
        error:err.status
    });

})

//export module important 
module.exports = app;