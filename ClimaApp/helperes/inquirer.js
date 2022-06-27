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
        name: `${"1.-".green} Buscar Ciudad`,
      },
      {
        value: 2,
        name: `${"2.-".green} Historial`,
      },
      {
        value: 0,
        name: `${"0.-".green} Salir`,
      }
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
      message: "Lugar: ",
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

const opcionLugares = async (lugares) => {
  const preguntas = [
    {
      type: "list",
      name: "lugar",
      message: "Escoja un lugar: ",
      choices: lugares.map((l) => {
        const { Ciudad, id } = l;
        return {
          value: id,
          name: Ciudad,
        };
      }),
    },
  ];

  const { lugar } = await inquirer.prompt(preguntas);

  const lugarSeleccionado = lugares.find((l)=> l.id === lugar);
  return lugarSeleccionado;
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
  opcionLugares,
  listarTareas,
  pausaEliminar
};
