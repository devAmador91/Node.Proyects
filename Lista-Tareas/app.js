require("colors");
const {
  inquiererMenu,
  pausa,
  leerInput,
  opcionTareas,
  listarTareas,
  pausaEliminar
} = require("./helpers/inquirer");
const Tareas = require("./models/tareas");
const { guardarData, leerData } = require("./helpers/guardarArchivo");

const main = async () => {
  const tareas = new Tareas();
  const tareasAlmacenadas = leerData();

  if (tareasAlmacenadas) {
    tareas.cargarTareas(tareasAlmacenadas);
  }

  let opt = "";
  do {
    opt = await inquiererMenu();

    switch (opt) {
      case 1:
        const desc = await leerInput();
        tareas.crearTarea(desc);
        break;
      case 2:
        tareas.listar();
        break;
      case 3:
        tareas.listarEstado(true).forEach((t, i) => {
          const { descripcion, completado } = t;
          console.log(
            `${String(i + 1).green}${".".green} ${descripcion} :: ${
              completado.green
            }`
          );
        });
        break;
      case 4:
        tareas.listarEstado(false).forEach((t, i) => {
            const { descripcion } = t;
            console.log(
              `${String(i + 1).green}${".".green} ${descripcion} :: ${
                "Pendiente".red
              }`
            );
          });
        break;
      case 5:
        const tareasPendientes = tareas.listarEstado(false);
        const idTareaPendiente = await opcionTareas(tareasPendientes);
        tareas.completarTareas(idTareaPendiente);
        break;
      case 6:
        const listaTareas = tareas.listaArr;
        const idTareaEliminar = await listarTareas(listaTareas);
        const response = await pausaEliminar();
        if(response === "s"){
        tareas.eliminarTarea(idTareaEliminar);
        }
    }

    guardarData(tareas.listaArr);

    await pausa();
  } while (opt !== 0);
};

main();
