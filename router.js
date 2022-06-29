var express = require('express');
const loginUser = require('./backend/controllers/users').loginUser;
const newUser = require('./backend/controllers/users').newUser;
var router = express.Router();

//login user
router.post('/login',loginUser);
router.post('/signup',newUser);
 
//route for dashboard
router.get('/dashboard', (req, res)=>{
    if(req.session.user){
        res.render('dashboard', {user: req.session.user})
    }else{
        res.send("Unauthorized User")
    }
});

//route for logout
router.get('/logout', (req, res)=>{
    req.session.destroy(function(err){
        if(err){
            console.log(err);
            res.send("Error")
        }else{
            res.render('base',{title:"Login",logout:"Logged you out successfully..."})
        }
    })
})

//route for livechat
router.get('/chat', (req, res)=>{
    res.render('chat', {user: req.session.user})
})

// router.get('/date', (req, res)=>{
//     res.render('date', {user: req.session.user})
// })

module.exports = router;