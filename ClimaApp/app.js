require("dotenv").config();
const { inquiererMenu, pausa, leerInput, opcionLugares } = require("./helperes/inquirer");
const Busquedas = require("./helperes/models/busquedas");

const main = async () => {
  console.clear();
  const busquedas = new Busquedas();
  let opt = 0;
  do {
    opt = await inquiererMenu();
    switch (opt) {
      case 1:
        //Mostrar mesaje
        const lugar = await leerInput();
        //Buscar los lugares
        const lugares = await busquedas.ciudad(lugar);
        //Seleccionar lugar
        const {Ciudad, Longitud, Latitud} = await opcionLugares(lugares);
        //Datos del clima
        //Mostrar Resultados
        console.log("\nInformación de la ciudad\n".green);
        console.log(`Ciudad: ${Ciudad}`);
        console.log(`Lat: ${Latitud}`);
        console.log(`Lng: ${Longitud}`);
        console.log("Temperatura");
        console.log("Minima:");
        console.log("Maxima:");
        break;
      case 2:
        console.log("Opcion 2");
        break;
    }
    await pausa();
  } while (opt !== 0);
};

main();
