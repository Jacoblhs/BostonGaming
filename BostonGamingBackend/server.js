require('dotenv').config(); // KUN TIL DEV/test lokalt - 

const cors = require('cors');
const express = require('express');

const app = express();
const PORT = process.env.PORT;



// Mongoose og MongoDB ---------------------------------------------------
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
//mongoose.connect(process.env.DATABASE_URL_EXT, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log("/// -----> Halløjsa - her er din DATABASE! Frisk og klar til indsats!  ʕʘ̅͜ʘ̅ʔ "));



// APP ----------------------------------------------------------------
app.use(cors({ credentials: true, origin: true }));         // CORS
app.use(express.static('public'))                           // Kald til statiske filer -> public-folder
app.use(express.json());                                    // Mulighed for json
app.use(express.urlencoded({ extended: true }));            // Aht req.body



// SESSION - (stored/opbevares i mongoDB) -----------------------------

const session = require('express-session');
const MongoStore = require('connect-mongo')(session); 

const FOUR_DAYS = 1000 * 60 * 60 * 24 * 4;   
// Session med config-object i sig https://www.youtube.com/watch?v=OH6Z0dJ_Huk ca. 3:00
app.use(session({
    name: process.env.SESSION_NAME,
    resave: false, // oprindelig true
    saveUninitialized: true, // hvis true sættes der en session-cookie ved hvert besøg til api'et - uden userID hvis ikke logget ind. False så er der kun cookie ved login
    store: new MongoStore({ mongooseConnection: db }), // session gemmes i mongo
    secret: process.env.SESS_SECRET,
    cookie: {
        maxAge: FOUR_DAYS,
        sameSite: 'strict', // 'strict' 'none' og 'lax' giver problemer i browser
        secure: false, //process.env.NODE_ENV === 'production', ... om http eller https
        httpOnly: true // kun serverside adgang til cookie - ikke adgang fra js clientside med fx document.cookie
    }
}))



// ROUTES ----------------------------------------------------------

//  INDEX
app.get('/', async (req, res) => {
    console.log("Welcome bienvenue willkommen - serverens startside - vælg en route hvis du vil andet end denne console-log-sniksnak!")
});



// --> --> --> UDKOMMENTER DENNE DEL - hvis login skal slås fra ... og omvendt!

// ----- TJEK OM AUTHORIZED (der er logget ind og sessioncookie er sat) hvis route indeholder ordet admin
// app.use('*/admin*', async (req, res, next) => {

//     if (req.session && req.session.userId) {
//         console.log("Login godkendt - brugers ID: ", req.session.userId, " sessionID: ", req.sessionID)
//         return next()
//     } else {
//         return res.status(401).json({ message: 'Du har ikke adgang - du skal være logget ind' }) //route
//     }

// })



//  ROUTES -------------------------------------------
app.use('/about', require('./routes/about.routes'));
app.use('/footer', require('./routes/footer.routes'));
app.use('/category', require('./routes/category.routes'));
app.use('/contact', require('./routes/contact.routes'));
app.use('/product', require('./routes/product.routes'));
app.use('/slider', require('./routes/slider.routes'));
app.use('/newssubscription', require('./routes/newssubscription.routes'));
app.use('/user', require('./routes/user.routes'));
app.use('/gear', require('./routes/gear.routes'));
app.use('/gearcategory', require('./routes/gearcategory.routes'));
app.use('/login', require('./routes/login.routes'));




// LISTEN --------------------------------------------------------------------------------------------------
app.listen(PORT, () => console.log('/// -----> Din SERVER er eksamensklar, fuld af krudt og godt humør - og lytter nu for vildt på port ' + PORT + "  ۜʕʘ̅͜ʘ̅ʔ "));
