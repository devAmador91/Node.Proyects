const axios = require("axios");
const { MAPBOX_KEY } = process.env;

class Busquedas {
  historial = ["Tegucigalpa", "México", "Colombia", "Cuba"];

  constructor() {
    //Lerr Db si existe
  }

  get paramsMapBox() {
    return {
      access_token: `${MAPBOX_KEY}`,
      limit: 5,
      language: "es",
    };
  }

  async ciudad(lugar = "") {
    try {
      const instancia = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
        params: this.paramsMapBox,
      });
      const response = await instancia.get();
      const { features } = response.data;
      const dataCity = features.map((f) => {
        return {
          id: f.id,
          Ciudad: f.place_name,
          Longitud: f.center[0],
          Latitud: f.center[1],
        };
      });
      return dataCity;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
}

module.exports = Busquedas;
