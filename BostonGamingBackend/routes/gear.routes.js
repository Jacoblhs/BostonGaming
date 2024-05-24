const Gear = require('../models/gear.model');

const express = require('express');
const router = express.Router();

// formdata (el. json)
const formData = require('express-form-data');
router.use(formData.parse());



// ----- HENT/GET ALLE ------------------------------------------------------------------------------------------

router.get('/', async (req, res) => {

    console.log("HENT ALLE - gear");

    try {
        const gears = await Gear.find().sort([['gearcategory', 1]]).populate('gearcategory');
        res.json(gears);

    } catch (err) {
        res.status(500).json({ message: "Der var en fejl i: " + err.message });
    }

});


// ----- HENT/GET UD FRA GEARCATEGORY ------------------------------------------------------------------------------------------

router.get('/gearcategory/:gearcat', async (req, res) => {

    console.log("HENT ALLE UD FRA gearcategory");

    try {
        const gears = await Gear.find({'gearcategory': req.params.gearcat}).populate('gearcategory');
        res.json(gears);

    } catch (err) {
        res.status(500).json({ message: "Der var en fejl i: " + err.message });
    }

});



// ----- HENT/GET UDVALGT  ------------------------------------------------------------------------------------------------------------- 

router.get('/:id', findGear, async (req, res) => { //

    console.log("HENT UDVALGT - gear")

    res.json(res.gear);

});



// ----- INGEN ADMIN - IKKE EN DEL AF OPGAVEN ---------------------------------------------------------------------------------------

// ----- OPRET/POST NY - ADMIN ---------------------------------------------------------------------------------------

router.post('/admin', async (req, res) => {

    console.log("POST - gear")

    let gear = new Gear(req.body);

    try {
        const ny = await gear.save();
        res.status(201).json({ message: "Ny gear er oprettet", oprettet: ny });

    } catch (error) {
        res.status(400).json({ message: "Der er sket en fejl", error: error });
    }

});


// MIDDLEWARE: FIND UD FRA ID  ---------------------------------------------------------------------------------------------

async function findGear(req, res, next) {

    console.log("FIND UD FRA ID - gear")

    let gear;

    try {

        gear = await Gear.findById(req.params.id).populate('gearcategory');

        if (gear == null) {
            return res.status(404).json({ message: 'Ingen gear med den ID' });
        }


    } catch (error) {

        console.log(error);
        return res.status(500).json({ message: "Problemer: " + error.message });
    }

    res.gear = gear;
    next();
}

module.exports = router;