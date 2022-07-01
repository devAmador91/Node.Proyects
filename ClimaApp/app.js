require("dotenv").config();
const {
  inquiererMenu,
  pausa,
  leerInput,
  opcionLugares,
} = require("./helperes/inquirer");
const Busquedas = require("./helperes/models/busquedas");
require("colors");

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
        if (!lugares.length) {
          console.log("No se encontro la ciudad ingresada".red);
          break;
        }

        //Seleccionar lugar
        const { Ciudad, Longitud, Latitud } = await opcionLugares(lugares);
        busquedas.registroCiudades(Ciudad);
        //Datos del clima
        const { temperatura, min, max, descripcion } = await busquedas.clima(
          Longitud,
          Latitud
        );
        //Mostrar Resultados
        console.log("\nInformación de la ciudad\n".green);
        console.log(`Ciudad: ${Ciudad}`);
        console.log(`Lat: ${Latitud}`);
        console.log(`Lng: ${Longitud}`);
        console.log(`Temperatura: ${temperatura}`);
        console.log(`Minima: ${min}`);
        console.log(`Maxima: ${max}`);
        console.log(`Descripcion: ${descripcion}`);
        break;
      case 2:
        if (busquedas.historialBusquedas) {
          busquedas.historialBusquedas.map((c, i) => {
            console.log(`${i + 1}`.green, `${c}`);
          });
        }
        break;
    }
    await pausa();
  } while (opt !== 0);
};

main();
