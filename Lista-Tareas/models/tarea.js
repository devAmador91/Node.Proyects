const {v4: uuidv4} = require('uuid');

class Tarea {
    id = '';
    descripcion = '';
    completado = null;

    constructor(descripcion){
        this.descripcion = descripcion;
        this.id = uuidv4();
    };
};

module.exports = Tarea;