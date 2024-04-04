const express = require('express');
const route = express.Router();
const myProfile = require('../controllers/myProfileController');

route.post('/login',myProfile.LogIn);
route.post('/signup',myProfile.SignUp);
route.post('/update-profile',myProfile.UpdateProfile)
route.get('/login',myProfile.logInSite);
route.get('/logout',myProfile.Logout)    
route.get('/',myProfile.UserProfile);
module.exports = route;