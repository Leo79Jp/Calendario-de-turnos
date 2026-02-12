// ===============================
// CONFIGURACIÓN DE REGÍMENES
// ===============================
const REGIMENES = {
  "6x1": {
    inicioCiclo: new Date(2025, 11, 29),
    cicloDias: 21,
    diasTrabajo: 6,
    diasFranco: 1,
    equipos: ["M", "T", "N"],
    letras: {
      M: ["G", "H", "F"],
      T: ["H", "F", "G"],
      N: ["F", "G", "H"]
    },
    tipoFranco: "fijo"
  },

  "6x2": {
    inicioCiclo: new Date(2026, 0, 1), 
    cicloDias: 24, 
    diasTrabajo: 6,
    diasFranco: 2,
    equipos: ["M", "T", "N", "F"],
    mapeoLetras: {
      "K": 5,  // Último día de Mañana (Día 6 de 6)
      "D": 23, // Último día de Franco (Día 2 de 2, antes de Mañana)
      "J": 11, // 4to día de Noche (8, 9, 10, 11 -> es el cuarto)
      "E": 17  // 2do día de Tarde (16, 17 -> es el segundo)
    },
    tipoFranco: "rotativo"
  }
};

function obtenerLetraEnTurno(turnoBusqueda, diaCiclo, config, fecha) {
  
  if (config.tipoFranco === "fijo") {
    if (fecha.getDay() === 0) return "_";
    const diasPorBloque = 7; 
    const bloque = Math.floor((diaCiclo - 1) / diasPorBloque);
    const secuencia = config.letras[turnoBusqueda];
    return secuencia[bloque % secuencia.length];
  }

  let letraEncontrada = "_";

  Object.keys(config.mapeoLetras).forEach(letra => {
    const inicioDiferencia = config.mapeoLetras[letra];
    const pos = ((diaCiclo - 1 + inicioDiferencia) % 24 + 24) % 24;

    let turnoActual;
    
    if (pos >= 0 && pos <= 5) turnoActual = "M";
    else if (pos >= 6 && pos <= 7) turnoActual = "F";
    else if (pos >= 8 && pos <= 13) turnoActual = "N";
    else if (pos >= 14 && pos <= 15) turnoActual = "F";
    else if (pos >= 16 && pos <= 21) turnoActual = "T";
    else if (pos >= 22 && pos <= 23) turnoActual = "F";

    if (turnoActual === turnoBusqueda) {
      letraEncontrada = letra;
    }
  });

  return letraEncontrada;
}

function generarMes(anio, mes, regimen) {
  const config = REGIMENES[regimen];
  const diasEnMes = new Date(anio, mes, 0).getDate();
  const calendario = [];

  for (let dia = 1; dia <= diasEnMes; dia++) {
    const fecha = new Date(anio, mes - 1, dia);
    const diffMs = fecha.getTime() - config.inicioCiclo.getTime();
    const diffDias = Math.round(diffMs / (1000 * 60 * 60 * 24)); 
    
    const diaCiclo = ((diffDias % config.cicloDias) + config.cicloDias) % config.cicloDias + 1;

    const registroDia = { dia };
    config.equipos.forEach(eq => {
      registroDia[eq] = obtenerLetraEnTurno(eq, diaCiclo, config, fecha);
    });
    calendario.push(registroDia);
  }
  return calendario;
}

function generarAnio(anio, regimen = "6x1") {
    const meses = [];
    for (let mes = 1; mes <= 12; mes++) {
      meses.push({
        mes,
        mesIndex: mes - 1,
        nombreMes: new Date(anio, mes - 1).toLocaleString("es-AR", { month: "long" }),
        dias: generarMes(anio, mes, regimen)
      });
    }
    return meses;
  }
  
module.exports = { generarMes, generarAnio, REGIMENES };