const fs = require('fs');
const colors = require('colors');

const crearTabla = (base, list, limit) =>{
    let tabla = '';

for(let i = 1 ; i <= limit; i++){
    tabla += `${base} * ${i} = ${base * i}\n`
}

if(list){
    console.log(`
=================
Tabla del: ${base}
=================
`.blue,tabla.green)
}


return new Promise((resolve, reject)=>{
    fs.writeFile(`./salida/tabla-del-${base}.txt`, tabla, (err)=>{
        if(err){
         reject(err);
        } 
        resolve(`Tabla del ${base}`);
    });
})


}

module.exports = crearTabla;