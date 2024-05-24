const Gearcategory = require('../models/gearcategory.model');

const express = require('express');
const router = express.Router();

// formdata (el. json)
const formData = require('express-form-data');
router.use(formData.parse());



// ----- HENT/GET ALLE ------------------------------------------------------------------------------------------

router.get('/', async (req, res) => {

    console.log("HENT ALLE - gearcategory");

    try {
        const gearcats = await Gearcategory.find()//.sort([['category', 1]]).populate('category');
        res.json(gearcats);

    } catch (err) {
        res.status(500).json({ message: "Der var en fejl i: " + err.message });
    }

});



// ----- HENT/GET UDVALGT  ------------------------------------------------------------------------------------------------------------- 

router.get('/:id', findGearcategory, async (req, res) => { //

    console.log("HENT UDVALGT - gearcategory")

    res.json(res.gearcategory);

});



// ----- INGEN ADMIN - IKKE EN DEL AF OPGAVEN ---------------------------------------------------------------------------------------

// ----- OPRET/POST NY - ADMIN ---------------------------------------------------------------------------------------

router.post('/admin', async (req, res) => {

    console.log("POST - gearcategory")

    let gearcat = new Gearcategory(req.body);

    try {
        const ny = await gearcat.save();
        res.status(201).json({ message: "Ny gearcategory er oprettet", oprettet: ny });

    } catch (error) {
        res.status(400).json({ message: "Der er sket en fejl", error: error });
    }

});

// MIDDLEWARE: FIND UD FRA ID  ---------------------------------------------------------------------------------------------

async function findGearcategory(req, res, next) {

    console.log("FIND UD FRA ID - gearcategory")

    let gearcat;

    try {

        gearcat = await Gearcategory.findById(req.params.id);

        if (gearcat == null) {
            return res.status(404).json({ message: 'Ingen gearcategory med den ID' });
        }


    } catch (error) {

        console.log(error);
        return res.status(500).json({ message: "Problemer: " + error.message });
    }

    res.gearcategory = gearcat;
    next();
}

module.exports = router;