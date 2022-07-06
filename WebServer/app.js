const express = require("express");
const app = express();
const hbs = require("hbs");
require('dotenv').config()
const port = process.env.PORT;

//HandleBar
hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");
//Enviar contenido publico estatico
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home", {
    nombre: "Amador Aguilar",
    titulo: "Estudiando NodeJs",
  });
});

app.get("/generic", (req, res) => {
  res.render("generic", {
    nombre: "Amador Aguilar",
    titulo: "Estudiando NodeJs",
  });
});

app.get("/elements", (req, res) => {
  res.render("elements", {
    nombre: "Amador Aguilar",
    titulo: "Estudiando NodeJs",
  });
});

app.get("*", (req, res) => {
  res.sendFile(__dirname + "/public/404.html");
});

app.listen(port, () => {
  console.log(`Esta conectado al puerto ${port}`);
});
