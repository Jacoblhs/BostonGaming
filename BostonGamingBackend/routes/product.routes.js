const Product = require('../models/product.model');

const express = require('express');
const router = express.Router();

// Multer til upload af images
const multer = require('multer');
const upload = multer({

    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'public/images/product');
        },
        filename: function (req, file, cb) {
            //cb(null, Date.now() + '-' + file.originalname)
            cb(null, file.originalname)
        }
    })
});



// ----- HENT/GET ALLE ------------------------------------------------------------------------------------------

router.get('/', async (req, res) => {

    console.log("HENT ALLE - product");

    try {

        // Hent medsendte query - dem efter ?limit
        // Hvis limit kan være et heltal et ikke-ikkenummer
        let limit;
        if (req.query.limit) {
            if (!isNaN(parseInt(req.query.limit))) limit = parseInt(req.query.limit);
        }

        const product = await Product.find().limit(limit).populate('category');
        res.json(product);

    } catch (err) {
        res.status(500).json({ message: "Der var en fejl i :" + err.message }); // 500 = serverproblem
    }

});




// ----- HENT/GET - SØG product ------------------------------------------------------------------------------------------------------------- 
// ----- OBS! Denne skal ligge før /:id da ordet "soeg" i routen ellers bliver regnet for en "id"

router.get('/search/:searchkey', async (req, res) => { //

    console.log("SØG - product");

    try {

        const product = await Product.find({
            $or: [
                // søg i title og content -  små bogstaver/i
                { "title": { "$regex": req.params.searchkey, "$options": "i" } },
                { "content": { "$regex": req.params.searchkey, "$options": "i" } },
            ]
        }).populate('category');

        res.json(product);

    } catch (err) {
        res.status(500).json({ message: "Der var en fejl i: " + err.message }); // 500 = serverproblem
    }

});

// ----- HENT/GET - Produkter ud fra category ID ------------------------------------------------------------------------------------------------------------- 
// ----- OBS! Denne skal ligge før /:id da ordet "soeg" i routen ellers bliver regnet for en "id"

router.get('/category/:catid', async (req, res) => { //

    console.log("HENT PRODUKTER UD FRA KATEGORI");

    try {

        const product = await Product.find({ "category": req.params.catid }).populate('category');

        res.json(product);

    } catch (err) {
        res.status(500).json({ message: "Der var en fejl i: " + err.message }); // 500 = serverproblem
    }

});



// ----- HENT/GET UDVALGT ------------------------------------------------------------------------------------------------------------- 

router.get('/:id', findProduct, async (req, res) => { //

    console.log("HENT UD FRA ID - product")

    res.json(res.product);

});



// ----- OPRET/POST NY - ADMIN ---------------------------------------------------------------------------------------

router.post('/admin', upload.single('productimage'), async (req, res) => {

    console.log("POST - product");

    try {

        let product;

        // To måder: billede + stringified data ELLER formobjekt
        if (req.body.product) {
            product = new Product({
                ...JSON.parse(req.body.product),
                "productimage": req.file ? req.file.filename : "paavej.jpg"
            })
        } else {
            product = new Product(req.body);
            product.productimage = req.file ? req.file.filename : "paavej.jpg";      // filename kommer ikke automatisk med i request
        }


        const ny = await product.save();
        res.status(201).json({ message: "Ny er oprettet", product: ny });

    } catch (error) {
        res.status(400).json({ message: "Der er sket en fejl", error: error });
    }

});



// ----- SLET/DELETE - ADMIN ------------------------------------------------------------------------------------------------------------ 

router.delete('/admin/:id', findProduct, async (req, res) => {

    console.log("DELETE - product")

    try {

        await res.product.remove();
        res.status(200).json({ message: 'product er nu slettet' })

    } catch (error) {
        res.status(500).json({ message: 'product kan ikke slettes - der er opstået en fejl: ' + error.message })
    }



});



// ----- RET/PUT - ADMIN ------------------------------------------------------------------------------------------------------------ 

router.put('/admin/:id', upload.single('productimage'), findProduct, async (req, res) => {

    console.log("PUT - product")

    let product;

    try {

        if (req.body.product) {
            product = JSON.parse(req.body.product)
        } else {
            product = req.body;
        }

        res.product.title = product.title;
        res.product.content = product.content;
        res.product.category = product.category;

        // håndterer at billedet måske ikke skal udskiftes
        if (req.file) {
            res.product.productimage = req.file.filename;
        }

        await res.product.save();
        res.status(200).json({ message: 'Der er rettet', rettet: res.product });

    } catch (error) {
        res.status(400).json({ message: 'Der kan ikke rettes - der er opstået en fejl: ' + error.message })
    }

});


// MIDDLEWARE: FIND UD FRA ID  ---------------------------------------------------------------------------------------------

async function findProduct(req, res, next) {

    console.log("FIND UD FRA ID - product")
    let product;

    try {

        product = await Product.findById(req.params.id).populate('category');

        // denne hvis category-navn skal trækkes med ud:
        // product = await (await Product.findById(req.params.id).populate('category')); 

        if (product == null) {
            return res.status(404).json({ message: 'Ingen product med den ID' });
        }


    } catch (error) {

        console.log("FEJL...", error);
        return res.status(500).json({ message: "Problemer: " + error.message });
    }

    res.product = product;
    next();
}


module.exports = router;