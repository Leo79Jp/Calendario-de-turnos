const express = require("express");
const path = require("path");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use("/", require("./routes/turnosRoutes"));


const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}/calendario`));
