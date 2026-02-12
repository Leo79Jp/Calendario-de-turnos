const express = require("express");
const router = express.Router();
const turnosController = require("../controllers/turnosController");

router.get("/anio", turnosController.verAnio); 

router.get("/calendario", turnosController.redirigirAlCalendarioActual);

router.get("/calendario/:anio/:mes", turnosController.verMesPuntual);

module.exports = router;