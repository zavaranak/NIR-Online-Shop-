const session = require('express-session');
const MongoStore = require('connect-mongo')
//sessionSetup
function setupSession(app,URI,SECRET_KEY){
    const sessionStore =  MongoStore.create({
        mongoUrl:URI,
        collectionName:'sessions'
    })
    app.use(session({
        secret: SECRET_KEY, // Replace with a strong secret key
        resave: false,
        saveUninitialized: true,
        store: sessionStore,
        cookie: 
            {
            maxAge: 1000 * 60 * 60 * 24, // 24 hours
            httpOnly: true,
    }}));
}
//export module
module.exports ={setupSession};