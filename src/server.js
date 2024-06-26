//Library requires
require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const route = require("./routes/route");
const pug = require("pug");
const db = require("./config/dbconfig");
const session = require("./config/sessionManagement");
const http = require("http");
const server = http.createServer(app);
const nodemon = require("nodemon");
//const ws = require('ws'); Maybe for chatbox in the future
//Connect to database
db.connect(process.env.URI_MONGODB);
//Initiate variables
const PORT = 3000;
//Set app: static file, view engine, views path, json, urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("src/assets"));
session.setupSession(app, process.env.URI_MONGODB, process.env.SECRET_KEY);
//Routing
app.use(route);
//Listen to port
server.listen(PORT, () => {
  console.log(`Listening at PORT: ${PORT}`);
});
