const express = require('express');
const passport = require('passport');
const User = require('../models/User');
const router = express.Router() //mini instance

// to show the form of signup
router.get('/register' , (req,res)=>{
    res.render('auth/signup');
})

// actually want to register a user in my DB
router.post('/register' , async(req,res,next)=>{
    try{
        let {email,password,username,role} = req.body;
        const user = new User({email,username,role});
        const newUser = await User.register(user , password );
        req.login( newUser , function(err){
            if(err){return next(err)}
            req.flash('success' , 'welcome,  you are registed succesfully');
            return res.redirect('/products');
        })
    }
    catch(e){
        req.flash('error' , e.message);
        return res.redirect('/register');   // 🔥 fixed wrong path (/signup → /register)
    }
})


// to get login form
router.get('/login' , (req,res)=>{
    res.render('auth/login');
})

// to actually login via the db
router.post('/login', 
    passport.authenticate('local', { 
        failureRedirect: '/login', 
        failureFlash: true       // 🔥 should be failureFlash, not failureMessage
    }),
    (req,res)=>{
        req.flash('success' , 'welcome back')
        res.redirect('/products');
})


// logout
router.get('/logout' , (req,res,next)=>{
    req.logout(function(err){     // 🔥 fixed broken logout
        if(err){return next(err);}
        req.flash('success' , 'goodbye friends, see you again')
        res.redirect('/login');
    });
})

module.exports = router;
