require("colors");
const { inquiererMenu, pausa, leerInput } = require("./helpers/inquirer");
const Tareas = require("./models/tareas");

const main = async () => {
    const tareas = new Tareas();
  let opt = "";
  do {
    opt = await inquiererMenu();

    switch(opt){
        case 1:
             const desc = await leerInput('Descripcion:');
             tareas.crearTarea(desc);   
             break;
        case 2: console.log(tareas._listado); break;

    }

    await pausa();
  } while (opt !== 0);
};

main();
