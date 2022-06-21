const crearTabla = require("./helpers/multiplicar");
const argv = require('./config/yargs');

console.clear();

crearTabla(argv.b, argv.l, argv.h)
  .then((isCreate) => console.log(isCreate, "fue creado con exito"))
  .catch((err) => console.log(err));






//console.log(process.argv);//<-- argumentos de consola
/*
MODO MANUAL --->
const [,,arg = 'base=5'] = process.argv;
const [,base = 5] = arg.split('=');
console.log(base);
*/


