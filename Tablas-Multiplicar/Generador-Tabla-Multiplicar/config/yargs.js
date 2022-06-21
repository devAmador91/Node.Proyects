const argv = require("yargs")
  .option("b", {
    alias: "base",
    type: "number",
    demandOption: true,
    describe:"Es la base de la multiplicacion"
  })
  .option("l", {
    alias: "list",
    type: "boolean",
    default: false,
    describe:"Lista la tabla creada"
  })
  .option("h", {
    alias: "hasta",
    type: "number",
    default: false,
    describe:"Opcion para ordenar un limite"
  })
  .check((argv, options) => {
    if (isNaN(argv.b || argv.h)) {
      throw "La base tiene que ser un numero";
    }

    if (typeof argv.l !== "boolean") {
      throw "Debe escribir un booleano";
    }
    return true;
  }).argv;


  module.exports = argv;