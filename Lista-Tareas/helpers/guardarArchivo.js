const fs = require('fs');
const archivo = './Almacenamiento/data.json';

const guardarData = (data) =>{
    fs.writeFileSync(archivo, JSON.stringify(data));
}

const leerData = () => {
    if(!fs.existsSync(archivo)){
        return null
    }
    const data = fs.readFileSync(archivo, {encoding:'utf-8'});
    const convert =  JSON.parse(data);
    return convert;
}

module.exports = {
    guardarData,
    leerData
}