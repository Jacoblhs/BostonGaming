const User = require('../models/user.model');

const express = require('express');
const router = express.Router();

// formdata (el. json)
const formData = require('express-form-data');
router.use(formData.parse());



// ----- LOGIN (tilføj session hvis match) ---------------------------------------------------------------------------------

router.post('/login', async (req, res) => {

    console.log("LOGIN");

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(401).json({ message: "User findes ikke ud fra email" })
        }


        user.comparePassword(password, function (err, isMatch) {

            if (err) throw err;

            if (isMatch) {

                // put lidt ekstra i session
                req.session.userId = user._id // LAV SESSION med brugers id .."adminbruger._id"

                // response/message til login'eren
                res.json({ name: user.name, users_id: user._id });

            } else {
                // slet cookie - så en evt. tidligere succes bliver slettet når man forsøger at logge ind med forkert
                res.status(401).clearCookie(process.env.SESSION_NAME).json({ message: "Password matcher ikke user" });
            }
        });

    } catch (err) {
        res.status(500).json({ message: err.message }); // 500 = serverproblem
    }

});


// ----- LOGUD (destroy session) -------------------------------------------------------------------------------------------- 

router.get('/logout', async (req, res) => {

    console.log("LOGUD", req.session)

    // Destroy session på server
    req.session.destroy(err => {

        // FEJL
        if (err) return res.status(500).json({ message: 'Logud lykkedes ikke - prøv igen' }) 

        // Clear cookie i klients browser
        res.clearCookie(process.env.SESSION_NAME).json({ message: 'cookie slettet' });

    })

});



// ----- LOGGET IND? true eller false --------------------------------------------------------------------------------------- 

router.get('/loggedin', async (req, res) => {

    console.log("LOGGET IND?", req.session)

    // Hvis userId findes i session
    if (req.session.userId) {

        return res.status(200).json({ message: 'Login er stadig aktiv' }) //route

    } else {

        return res.status(401).json({ message: 'Login eksisterer ikke eller er udløbet' })
    }

})


module.exports = router;