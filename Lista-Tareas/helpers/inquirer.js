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
        name: `${"1.-".green} Crear Lista`,
      },
      {
        value: 2,
        name: `${"2.-".green} Listar Tareas`,
      },
      {
        value: 3,
        name: `${"3.-".green} Listar Tareas Completadas`,
      },
      {
        value: 4,
        name: `${"4.-".green} Listar Tareas Pendientes`,
      },
      {
        value: 5,
        name: `${"5.-".green} Completar Tareas`,
      },
      {
        value: 6,
        name: `${"6.-".green} Borrar Tarea(s)`,
      },
      {
        value: 0,
        name: `${"0.-".green} Salir`,
      },
    ],
  },
];

const inquiererMenu = async () => {
  console.clear();
  console.log("======================".green);
  console.log("Seleccione una opción:".cyan);
  console.log("======================\n".green);

  const { option } = await inquirer.prompt(preguntasMenu);
  return option;
};

const preguntaPausa = [
  {
    type: "input",
    name: "enter",
    message: `Presione ${`Enter`.green} para continuar...`,
  },
];

const pausa = async () => {
  console.log("\n");
  await inquirer.prompt(preguntaPausa);
};

const leerInput = async () => {
  const preguntas = [
    {
      type: "input",
      name: "desc",
      message: "Descripción",
      validate(value) {
        if (value.length === 0) {
          return "Por favor ingrese un valor";
        }
        return true;
      },
    },
  ];
  const { desc } = await inquirer.prompt(preguntas);
  return desc;
};

const opcionTareas = async (tareas) => {
  const preguntas = [
    {
      type: "checkbox",
      name: "tarea",
      message: "Escoja una tarea y seleccione pendiente o completada",
      choices: tareas.map((t) => {
        const { descripcion, id } = t;
        return {
          value: id,
          name: descripcion,
        };
      }),
    },
  ];

  const { tarea } = await inquirer.prompt(preguntas);
  return tarea;
};

const listarTareas = async(tareas) =>{
    const preguntas = [
        {
          type: "checkbox",
          name: "tarea",
          message: "Escoja una tarea a eliminar",
          choices: tareas.map((t) => {
            const { descripcion, id } = t;
            return {
              value: id,
              name: descripcion,
            };
          }),
        },
      ];
    
      const { tarea } = await inquirer.prompt(preguntas);
      return tarea;
}

const preguntaEliminar = [
    {
      type: "input",
      name: "response",
      message: `Presione ${`[s]`.green} para continuar o ${`[n]`.green} para cancelar`,
      validate(value) {
        if (value === "s" || value === "n") {
          return true
        }
        return "Por favor ingrese [s] o [n]";
      },
    },
  ];
  
  const pausaEliminar = async () => {
    console.log("\n");
   const {response} = await inquirer.prompt(preguntaEliminar);
   return response;
  };



module.exports = {
  inquiererMenu,
  pausa,
  leerInput,
  opcionTareas,
  listarTareas,
  pausaEliminar
};
