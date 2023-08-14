const express = require('express');
const router = express.Router();

const auth = require("../middleware/authentication");

const {
	getAllTrains,
	getTrain
} = require("../controllers/trains");


router.get("/trains", [auth], getAllTrains);
router.get("/trains/:trainNumber", [auth], getTrain);


module.exports = router ;	