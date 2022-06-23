const inquirer = require("inquirer");
require("colors");

const preguntasMenu = [
  {
    type: "list",
    name: "option",
    message: "¿Que desea hacer?",
    choices: [
      {
        value: 1,
        name: "1.- Crear Lista",
      },
      {
        value: 2,
        name: "2.- Listar Tareas",
      },
      {
        value: 3,
        name: "3.- Listar Tareas Completadas",
      },
      {
        value: 4,
        name: "4.- Listar Tareas Pendientes",
      },
      {
        value: 5,
        name: "5.- Completar Tareas",
      },
      {
        value: 6,
        name: "6.- Borrar Tarea(s)",
      },
      {
        value: 0,
        name: "0.- Salir",
      },
    ],
  },
];

const inquiererMenu = async () => {
  console.clear();
  console.log("======================".green);
  console.log("Seleccione una opción:".green);
  console.log("======================\n".green);

  const {option} = await inquirer.prompt(preguntasMenu);
  return option;
};

const preguntaPausa = [
  {
    type: "input",
    name: 'enter',
    message:`Presione ${`Enter`.green} para continuar...`
  },
];

const pausa = async () => {
    console.log('\n')
  await inquirer.prompt(preguntaPausa);
};

const leerInput = async (message) =>{
    const preguntas = [{
        type: 'input',
        name: 'desc',
        message,
        validate(value){
            if (value.length === 0){
                return "Por favor ingrese un valor";
            }
            return true;
        }
    }];
    const {desc} = await inquirer.prompt(preguntas);
    return desc;
}

module.exports = {
  inquiererMenu,
  pausa,
  leerInput
};
