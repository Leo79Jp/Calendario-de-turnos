const express = require("express");
const path = require("path");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

// --- SOLUCIÓN PARA EL "CANNOT GET /" ---
// Si alguien entra a la raíz, lo mandamos al calendario
app.get("/", (req, res) => {
  res.redirect("/calendario");
});

app.use("/", require("./routes/turnosRoutes"));

// --- SOLUCIÓN PARA EL PUERTO EN RENDER ---
const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => console.log(`Servidor en puerto http://localhost:${PORT}`));