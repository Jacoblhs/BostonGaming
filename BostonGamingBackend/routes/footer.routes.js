const Footer = require('../models/footer.model');

const express = require('express');
const router = express.Router();

// formdata (el. json)
const formData = require('express-form-data');
router.use(formData.parse());

/*
    Footer findes som 1 instans i databasen = kun mulighed for at rette den ene = ingen opret/slet ...
*/


// ----- HENT/GET  ------------------------------------------------------------------------------------------------------------- 

router.get('/', async (req, res) => { //

    console.log("HENT - footer")


    try {

        let footer = await Footer.findOne();

        if (footer == null) {
            return res.status(404).json({ message: 'footer kunne ikke findes' });
        }

        res.json(footer);

    } catch (error) {

        console.log(error);
        return res.status(500).json({ message: "Problemer: " + error.message }); // problemer med server
    }

});



// ----- RET/PUT - ADMIN ------------------------------------------------------------------------------------------------------------ 

router.put('/admin/', async (req, res) => {

    console.log("PUT - footer")

    try {

        let footer = await Footer.findOne(); 

        // Husk at id ikke er med i req.body - derfor dur det ikke med res.gaade = req.body;
        footer.about = req.body.about;
        footer.location = req.body.location;
        await footer.save();

        res.status(200).json({ message: 'footer er rettet', rettet: footer });

    } catch (error) {
        res.status(400).json({ message: 'footer kan ikke rettes - der er opstået en fejl: ' + error.message })
    }

});

module.exports = router;