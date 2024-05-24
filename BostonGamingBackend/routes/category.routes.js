const Category = require('../models/category.model');
const Product = require('../models/product.model');

const express = require('express');
const router = express.Router();

// formdata (el. json)
const formData = require('express-form-data');
router.use(formData.parse());



// ----- HENT/GET ALLE ------------------------------------------------------------------------------------------

router.get('/', async (req, res) => {

    console.log("HENT ALLE - category");

    try {
        const categories = await Category.find().sort([['title', 1]]);
        res.json(categories);

    } catch (err) {
        res.status(500).json({ message: "Der var en fejl i: " + err.message });
    }

});



// ----- HENT/GET UDVALGT  ------------------------------------------------------------------------------------------------------------- 

router.get('/:id', findCategory, async (req, res) => { //

    console.log("HENT UDVALGT - category")

    res.json(res.category);

});



// ----- OPRET/POST NY - ADMIN ---------------------------------------------------------------------------------------

router.post('/admin', async (req, res) => {

    console.log("POST - category")

    let category = new Category(req.body);

    try {
        const ny = await category.save();
        res.status(201).json({ message: "Ny category er oprettet", oprettet: ny });

    } catch (error) {
        res.status(400).json({ message: "Der er sket en fejl", error: error });
    }

});



// ----- SLET/DELETE - ADMIN ------------------------------------------------------------------------------------------------------------ 

router.delete('/admin/:id', findCategory, async (req, res) => {

    console.log("DELETE - category")

    try {

        const cathasproducts = await Product.exists({ category: req.params.id  })//.countDocuments({ "category": req.params.id });

        console.log(cathasproducts);

        // Forhindre cats i at blive slettet hvis der er prod tilknyttet
        if (cathasproducts) return res.status(400).json({ message: 'category kan ikke slettes når der er produkter tilknyttet kategorien. Slet eller flyt først alle kategoriens produkter' })

        await res.category.remove();
        res.status(200).json({ message: 'category er nu slettet.' })

    } catch (error) {
        res.status(500).json({ message: 'category kan ikke slettes - der er opstået en fejl: ' + error.message })
    }

});



// ----- RET/PUT - ADMIN ------------------------------------------------------------------------------------------------------------ 

router.put('/admin/:id', findCategory, async (req, res) => {

    console.log("PUT - category")

    try {

        res.category.title = req.body.title;

        await res.category.save();
        res.status(200).json({ message: 'category er rettet', rettet: res.category });

    } catch (error) {
        res.status(400).json({ message: 'category kan ikke rettes - der er opstået en fejl: ' + error.message })
    }

});



// MIDDLEWARE: FIND UD FRA ID  ---------------------------------------------------------------------------------------------

async function findCategory(req, res, next) {

    console.log("FIND UD FRA ID - category")

    let category;

    try {

        category = await Category.findById(req.params.id);

        if (category == null) {
            return res.status(404).json({ message: 'Ingen category med den ID' });
        }


    } catch (error) {

        console.log(error);
        return res.status(500).json({ message: "Problemer: " + error.message });
    }

    res.category = category;
    next();
}

module.exports = router;