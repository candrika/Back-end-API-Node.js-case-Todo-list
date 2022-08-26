// import library
require('dotenv');
const express = require('express');

//import controller
const activityController=require('../controllers').activity;
const todoController=require('../controllers').todo;
// init router
const router =express.Router();

/**
 * import controller
 * route use http request like post, put, get, delete and etc
 */

// your route 
router.get('/',(req, res)=>{
    res.render('content/welcome',{
        title:'Home',
        layout:'layout.main-layout'
    })
})

//endpoint activity group
router.get('/activity',activityController.activityList);
router.get('/activity/:id',activityController.activityShow);
router.post('/activity',activityController.activityCreate);
router.patch('/activity/:id',activityController.activityUpdate);
router.delete('/activity/:id',activityController.activityDelete);

// endpoit todolist
router.get('/todo',todoController.todoList);
router.get('/todo/:id',todoController.todoShow);
router.post('/todo',todoController.todoCreate);
router.patch('/todo/:id',todoController.todoUpdate);
router.delete('/todo/:id',todoController.todoDelete);
module.exports=router;