require("colors");
const {
  inquiererMenu,
  pausa,
  leerInput,
  opcionTareas,
  listarTareas,
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
        const desc = await leerInput("Descripcion:");
        tareas.crearTarea(desc);
        break;
      case 2:
        tareas.listar();
        break;
      case 3:
        console.log(tareas.listarEstado(true));
        break;
      case 4:
        console.log(tareas.listarEstado(false));
        break;
      case 5:
        const tareasPendientes = tareas.listarEstado(false);
        const idTareaPendiente = await opcionTareas(tareasPendientes);
        tareas.completarTareas(idTareaPendiente);
        break;
      case 6:
        const listaTareas = tareas.listaArr;
        const idTareaEliminar = await listarTareas(listaTareas);
        tareas.eliminarTarea(idTareaEliminar);
    }

    guardarData(tareas.listaArr);

    await pausa();
  } while (opt !== 0);
};

main();
