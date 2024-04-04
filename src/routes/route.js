//requires library
const pug = require('pug');
const express = require('express');
const app =  express.Router();
const homeRouter = require('./mainSites');
//Keep Routing

app.use('',homeRouter);
app.get((req,res,next)=>{
    res.status(404).send("Page not found");
});

module.exports = app;

