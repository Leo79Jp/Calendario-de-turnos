const axios = require("axios");


const Holidays = require('date-holidays');
const { generarAnio, REGIMENES } = require("../models/turnosModel");

exports.redirigirAlCalendarioActual = (req, res) => {
  const anioActual = new Date().getFullYear();
  res.redirect(`/anio?anio=${anioActual}&regimen=6x1`);
};

exports.verAnio = (req, res) => {
    const anioActual = new Date().getFullYear();
    const anio = parseInt(req.query.anio) || anioActual;
    const regimen = REGIMENES[req.query.regimen] ? req.query.regimen : "6x1";

    const hd = new Holidays('AR', 'es'); 
    
    let calendarioAnual = generarAnio(anio, regimen);

    calendarioAnual.forEach((mesData) => {
        mesData.dias.forEach((diaObj) => {
            const fechaD = new Date(anio, mesData.mesIndex, diaObj.dia);
            
            const feriado = hd.isHoliday(fechaD);

            if (feriado) {
                diaObj.esFeriado = true;
                diaObj.motivoFeriado = feriado[0].name;
            }
        });
    });

    res.render("anio", { anio, regimen, calendarioAnual });
};
exports.verMesPuntual = (req, res) => {
  res.send("Vista mensual en desarrollo");
};