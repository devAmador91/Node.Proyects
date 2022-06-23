const Tarea = require("./tarea");

class Tareas {
    _listado = {};

    constructor(){
        this._listado = {};
    }

    get listaArr(){
        const listado = Object.keys(this._listado).map(key => {
            const tarea = this._listado[key];
            return tarea
        });
        return listado
    };

    crearTarea(descripcion){
        const tarea = new Tarea(descripcion);
        this._listado[tarea.id] = tarea
    }
}

module.exports = Tareas