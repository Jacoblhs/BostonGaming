const Slider = require('../models/slider.model');

const express = require('express');
const router = express.Router();

// Multer til upload af images
const multer = require('multer');
const upload = multer({

    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'public/images/slider');
        },
        filename: function (req, file, cb) {
            //cb(null, Date.now() + '-' + file.originalname)
            cb(null, file.originalname)
        }
    })
});



// ----- HENT/GET ALLE ------------------------------------------------------------------------------------------

router.get('/', async (req, res) => {

    console.log("HENT ALLE - slider");

    try {
        const slider = await Slider.find(); //.sort([['alttext', 1]]);
        res.json(slider);

    } catch (err) {
        res.status(500).json({ message: "Der var en fejl i: " + err.message });
    }

});



// ----- HENT/GET UDVALGT  ------------------------------------------------------------------------------------------------------------- 

router.get('/:id', findSlider, async (req, res) => { //

    console.log("HENT UDVALGT - slider")

    res.json(res.slider);

});



// ----- OPRET/POST NY - ADMIN ---------------------------------------------------------------------------------------

router.post('/admin', upload.single('sliderimage'), async (req, res) => {

    console.log("POST - slider")

    try {

        let slider;

        // To måder: billede + stringified data ELLER formobjekt
        if (req.body.slider) {

            slider = new Slider({
                ...JSON.parse(req.body.slider),
                "sliderimage": req.file ? req.file.filename : "paavej.jpg"
            })

        } else {

            slider = new Slider(req.body);
            slider.sliderimage = req.file ? req.file.filename : "paavej.jpg";
        }


        const ny = await slider.save();
        res.status(201).json({ message: "Ny er oprettet", oprettet: ny });

    } catch (error) {
        res.status(400).json({ message: "Der er sket en fejl", error: error });
    }

});



// ----- SLET/DELETE - ADMIN ------------------------------------------------------------------------------------------------------------ 

router.delete('/admin/:id', findSlider, async (req, res) => {

    console.log("DELETE - slider")

    try {

        await res.slider.remove();
        res.status(200).json({ message: 'Slider er nu slettet' })

    } catch (error) {
        res.status(500).json({ message: 'Der kan ikke slettes - der er opstået en fejl: ' + error.message })
    }

});



// ----- RET/PUT - ADMIN ------------------------------------------------------------------------------------------------------------ 

router.put('/admin/:id', upload.single('sliderimage'), findSlider, async (req, res) => {

    console.log("PUT - slider")

    let slider;

    try {

        if (req.body.slider) {
            slider = JSON.parse(req.body.slider)
        } else {
            slider = req.body;
        }

        res.slider.alttext = slider.alttext;
        // håndterer at billedet måske ikke skal udskiftes
        if (req.file) {
            res.slider.sliderimage = req.file.filename;
        }

        await res.slider.save();
        res.status(200).json({ message: 'Der er rettet', rettet: res.slider });

    } catch (error) {
        res.status(400).json({ message: 'Der kan ikke rettes - der er opstået en fejl: ' + error.message })
    }

});



// MIDDLEWARE: FIND UD FRA ID  ---------------------------------------------------------------------------------------------

async function findSlider(req, res, next) {

    console.log("FIND UD FRA ID - slider")

    let slider;

    try {

        slider = await Slider.findById(req.params.id);

        if (slider == null) {
            return res.status(404).json({ message: 'Ingen slider med den ID' });
        }


    } catch (error) {

        console.log(error);
        return res.status(500).json({ message: "Problemer: " + error.message });
    }

    res.slider = slider;
    next();
}

module.exports = router;