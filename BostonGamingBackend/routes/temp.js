const Produkt = require('../models/product.model')

const express = require('express')
const router = express.Router();


// ----- Multer - til upload af filer/billeder
const multer = require('multer')
const upload = multer({

    storage: multer.diskStorage({

        destination: function (req, file, cb) {
            cb(null, 'public/images');
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + '_' + file.originalname)
            //cb(null, file.originalname)
        }
    })
})



// ----- GET - Hent alle produkter --------------------------
router.get('/', async (req, res) => {

    console.log("HENT ALLE PRODUKTER")
    // henter alle produkter:

    try {

        const produkter = await Produkt.find().sort([['titel', -1]])  //.limit();
        res.json(produkter)

    } catch (error) {

        console.log("FEJL", error)
        res.status(400).json({ message: "Der er sket en fejl", error: error })
    }

})



// ----- GET - Hent udvalgt produkt ud fra ID --------------------------
router.get('/:id', findProdukt, async (req, res) => {

    console.log("HENT UDVALGT PRODUKT")
    res.json(res.produkt)

})



// ----- DELETE - Slet udvalgt produkt ud fra ID --------------------------
// router.delete('/:id', findProdukt, async (req, res) => {

//     console.log("SLET UDVALGT PRODUKT")

//     try {

//         await res.produkt.remove();
//         res.status(200).json({ message: 'Produktet er nu slettet' })

//     } catch (error) {

//         res.status(500).json({ message: "Produktet blev ikke slettet - fejl:" + error.message })

//     }

// })

// ----- DELETE - Slet udvalgt produkt ud fra ID --------------------------
router.delete('/:id', async (req, res) => {

    console.log("SLET UDVALGT PRODUKT")
    // https://mongoosejs.com/docs/queries.html

    Produkt.findByIdAndDelete(req.params.id, function (error, produkt) {

        if (error) {
            console.log(error)
            res.status(500).json({ message: "Produktet blev ikke slettet - fejl:" + error.message })
        }
        else {
            console.log("Slettet produkt: ", produkt);
            res.status(200).json({ message: 'Produktet er nu slettet:' + produkt })
        }

    })

    // try {

    //     await res.produkt.remove();
    //     res.status(200).json({ message: 'Produktet er nu slettet' })

    // } catch (error) {

    //     res.status(500).json({ message: "Produktet blev ikke slettet - fejl:" + error.message })

    // }

})



// ----- POST - Opret et produkt (der kommer en fil/et billede med - derfor multer som middleware!)
router.post('/', upload.single('produktbillede'), async (req, res) => {

    console.log("POST - product");

    try {

        // Gem i databasen via modellen
        let produkt = new Produkt(req.body);
        req.file ? produkt.billede = req.file.filename : null; // filnavn hentes fra Multer og gemmes i databasen

        const nytprodukt = await produkt.save();
        res.status(201).json({ message: "Nyt produkt er oprettet", produktet: nytprodukt })

    } catch (error) {

        console.log("FEJL", error)
        res.status(400).json({ message: "Der er sket en fejl", error: error })

    }

})



// ----- PUT - Ret et produkt (der kommer en fil/et billede med - derfor multer som middleware!)
router.put('/:id', upload.single('produktbillede'), findProdukt, async (req, res) => {

    console.log("PUT - product");

    try {

        // EXTRA
        const { titel, beskrivelse } = req.body

        // res.produkt.titel = req.body.titel;
        // res.produkt.beskrivelse = req.body.beskrivelse;
        res.produkt.titel = titel;
        res.produkt.beskrivelse = beskrivelse;

        // Billede - er måske ikke  rettet - og måske er det og i så fald udfyld db med filnavnet lavet i multer
        if (req.file) {
            res.produkt.billede = req.file.filename
        }

        await res.produkt.save();
        res.status(200).json({ message: 'Produktet er rettet', rettet: res.produkt })

    } catch (error) {

        console.log("FEJL", error)
        res.status(400).json({ message: "Der er sket en fejl", error: error })

    }

})



// ----- Middleware - find ud fra ID
async function findProdukt(req, res, next) {

    console.log("FIND UD FRA ID")

    let produktet;

    try {

        produktet = await Produkt.findById(req.params.id);

        if (produktet == null) {

            return res.status(404).json({ message: "Intet produkt med den ID!!!" })
        }


    } catch (error) {

        console.log("FEJL", error);

        return res.status(500).json({ message: "Problemer: " + error.message })

    }

    res.produkt = produktet; // indsæt det fundne produkt i responset
    next(); // fortsæt i den oprindelige function
}


module.exports = router;