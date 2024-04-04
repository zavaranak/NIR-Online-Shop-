const express = require('express');
const account = require('../models/UserAccount');
const bcrypt = require('bcrypt')

class myProfile{    
    UserProfile(req,res){
        if(req.session.userID){
            account.findById(req.session.userID)
            .then(account=>{
            if (account.username=="admin") res.redirect(303,'/admin')
            else res.render('myprofile/userprofile.pug',{title:"My Profile",userdata:account})
        })}
        else res.redirect(303,'/myprofile/login');
    
    }
    logInSite(req,res){
        res.render('myprofile/login.pug',{title:'My profile'});
    }
    Logout(req,res){
        try{
            req.session.destroy();
            res.redirect(303,'/myprofile')   
        }catch(err){
            res.render('error',{title:`Log out error ${err}`})      
        }
    }
    async LogIn(req,res){
        const password = req.body.password
        const username = req.body.username
        account.findOne({username:username})
            .then(account => 
                {
                account = account.toObject();
                if (bcrypt.compareSync(password,account.password))
                {
                req.session.userID = account._id;
                if (account.username == "admin") res.redirect(303,"/admin");
                else res.redirect(303,'/myprofile');
                }
                else res.render('myprofile/login',{title:"Login",message:"Wrong password or usename"})})
            .catch(err=>{
                res.render('myprofile/login',{title:"Login",message:"Wrong password or usename"})
            })
    }
    async SignUp(req,res){
            const username = req.body.username     
            var salt = Math.random()*10 
            const password = bcrypt.hashSync(req.body.password1,salt)
            console.log(password)
            const newAccount = new account({
                username: username,
                password: password,
            })
            await newAccount.save()
            res.redirect(303, '/myprofile');
    }
    async UpdateProfile(req,res){
        const userID = req.body.userID;
        const newFirstName = req.body.firstName;
        const newLastName = req.body.lastName;
        account.updateOne({_id:userID},req.body).then(()=>{res.redirect(303,'/myprofile')})
        .catch(err=>{
            res.render('error');
            console.log(userID);
            console.log(err);
        })
    }
}

module.exports = new myProfile();