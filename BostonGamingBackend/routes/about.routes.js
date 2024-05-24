const About = require('../models/about.model');

const express = require('express');
const router = express.Router();

// formdata (el. json)
// const formData = require('express-form-data');
// router.use(formData.parse());

/*
    About findes som 1 instans i databasen = kun mulighed for at rette den ene = ingen opret/slet ...
*/


// ----- HENT/GET  ------------------------------------------------------------------------------------------------------------- 

router.get('/', async (req, res) => { //

    console.log("HENT - about")


    try {

        let about = await About.findOne();

        if (about == null) {
            return res.status(404).json({ message: 'about kunne ikke findes' });
        }

        res.json(about);

    } catch (error) {

        console.log(error);
        return res.status(500).json({ message: "Problemer: " + error.message }); // problemer med server
    }

});



// ----- RET/PUT - ADMIN ------------------------------------------------------------------------------------------------------------ 

router.put('/admin/', async (req, res) => {

    console.log("PUT - about")

    try {

        let about = await About.findOne(); 

        // Husk at id ikke er med i req.body - derfor dur det ikke med res.gaade = req.body;
        about.content1 = req.body.content1;
        about.content2 = req.body.content2;
        await about.save();

        res.status(200).json({ message: 'about er rettet', rettet: about });

    } catch (error) {
        res.status(400).json({ message: 'about kan ikke rettes - der er opstået en fejl: ' + error.message })
    }

});

module.exports = router;