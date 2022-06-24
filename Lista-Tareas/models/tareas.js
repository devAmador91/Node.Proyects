const Tarea = require("./tarea");

class Tareas {
  _listado = {};

  constructor() {
    this._listado = {};
  }

  get listaArr() {
    const listado = Object.keys(this._listado).map((key) => {
      const tarea = this._listado[key];
      return tarea;
    });
    return listado;
  }

  crearTarea(descripcion) {
    const tarea = new Tarea(descripcion);
    this._listado[tarea.id] = tarea;
  }

  cargarTareas = (tarea = []) => {
    tarea.forEach((tarea) => {
      this._listado[tarea.id] = tarea;
    });
  };

  listar = () => {
    this.listaArr.forEach((tarea, i) => {
      const { descripcion, completado } = tarea;
      console.log(
        `${String(i + 1).green}${".".green} ${descripcion} :: ${
          completado ? completado.green : "Pendiente".red
        }`
      );
    });
  };

  listarEstado = (estado = true) => {

    const tareas = this.listaArr.filter((tarea) => {
      const { completado } = tarea;
      if (estado && completado) {
        return tarea;
      } else if (!estado && !completado) {
        return tarea;
      }
    });
    return tareas;
  };

  completarTareas = (id) => {
    id.forEach((id)=>{
        this._listado[id].completado = `Completado -> ${new Date().toISOString()}`;
    console.log("Estado de Tarea completado".green);
    })
    
  };

  eliminarTarea = (id) =>{
    id.forEach((id)=>{
    delete this._listado[id];
    console.log("Tarea eliminada".green);
  })
}

}

module.exports = Tareas;
