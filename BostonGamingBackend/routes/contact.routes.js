const Contact = require('../models/contact.model');

const express = require('express');
const router = express.Router();

// formdata (el. json)
const formData = require('express-form-data');
router.use(formData.parse());

/*
    OBS! Alle metoder - bortset fra POST - er admin. 
    Det skal kræve login at se alle kontakter/beskeder - men en bruger skal kunne sende en besked uden at være logget ind.

*/


// ----- HENT/GET ALLE - ADMIN (kun ADMIN bør kunne se kontaktbeskeder) ---------------------------------------------------------

router.get('/admin', async (req, res) => {

    console.log("HENT ALLE - contact");

    try {

        const contact = await Contact.find();
        res.json(contact);

    } catch (err) {
        res.status(500).json({ message: "Der var en fejl i: " + err.message }); // 500 = serverproblem
    }

});



// ----- HENT/GET UDVALGT kontakt - ADMIN (kun ADMIN bør kunne se kontaktbeskeder) --------------------------------------------------

router.get('/admin/:id', findContact, async (req, res) => { //

    console.log("HENT UD FRA ID - contact")

    res.json(res.contact);

});



// ----- OPRET/POST NY - ikke ADMIN! Alle kunder skal kunne sende en kontaktbesked -----------------------------------------------------------------

router.post('/', async (req, res) => {

    console.log("POST - contact");

    try {

        const contact = new Contact(req.body);
        // dato sættes automatisk med default i model

        const ny = await contact.save();
        res.status(201).json({ message: "Ny er oprettet", contact: ny });

    } catch (error) {
        res.status(400).json({ message: "Der er sket en fejl", error: error });
    }

});



// ----- SLET/DELETE - ADMIN ------------------------------------------------------------------------------------------------------------ 

router.delete('/admin/:id', findContact, async (req, res) => {

    console.log("DELETE - contact")

    try {

        await res.contact.remove();
        res.status(200).json({ message: 'Der er nu slettet' })

    } catch (error) {
        res.status(500).json({ message: 'Der kan ikke slettes - der er opstået en fejl: ' + error.message })
    }

});



// ----- OBS! INGEN RET/PUT - ADMIN ------------------------------------------------------------------------------------------------------------ 
// - det giver ikke mening at man kan rette en kontaktbesked fra en kunde.

router.patch('/admin/:id', findContact, async (req, res) => {

    console.log("PATCH - contact")

    try {

        res.contact.read = req.body.read; // true el. false (true=read/læst, false=unread/ikke læst)

        await res.contact.save();
        res.status(200).json({ message: 'contact read-status er rettet', rettet: res.contact });

    } catch (error) {
        res.status(400).json({ message: 'contact kan ikke rettes - der er opstået en fejl: ' + error.message })
    }

});



// MIDDLEWARE: FIND UD FRA ID  ---------------------------------------------------------------------------------------------

async function findContact(req, res, next) {

    console.log("FIND UD FRA ID - contact")

    let contact;

    try {

        contact = await Contact.findById(req.params.id);

        if (contact == null) {
            return res.status(404).json({ message: 'Ingen contact med den ID' });
        }

    } catch (error) {
        return res.status(500).json({ message: "Problemer: " + error.message }); 
    }

    res.contact = contact; 
    next();
}


module.exports = router;