const axios = require("axios");
const { MAPBOX_KEY, OPENWEATHER } = process.env;
const fs = require("fs");


class Busquedas {
  historial = [];

  constructor() {
    this.historialBusquedas;
  }

  get paramsMapBox() {
    return {
      access_token: `${MAPBOX_KEY}`,
      limit: 5,
      language: "es",
    };
  }
  //busqueda de ciudades
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

  get paramsClima() {
    return {
      appid: OPENWEATHER,
      units: "metric",
      lang: "es",
    };
  }

  async clima(lon, lat) {
    try {
      const instancia = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather`,
        params: { ...this.paramsClima, lon, lat },
      });
      const response = await instancia.get();
      const { main, weather } = response.data;
      return {
        temperatura: main.temp,
        min: main.temp_min,
        max: main.temp_max,
        descripcion: weather[0].description,
      };
    } catch (error) {
      console.log(error);
      return {};
    }
  }

  get historialBusquedas() {
    if (!fs.existsSync("./registro/data.json")) {
      return [];
    }

    const data = fs.readFileSync("./registro/data.json", { encoding: "utf-8" });
    const convert = JSON.parse(data);
    this.historial = convert;
    return this.historial;
  }

  registroCiudades = (registro) => {
    const data = this.historialBusquedas;

    if (data.length && data.includes(registro)) {
      return null;
    }
    this.historial.unshift(registro);
    if (this.historial.length > 5) {
      this.historial.pop();
    }
    fs.writeFileSync("./registro/data.json", JSON.stringify(this.historial));
  };
}

module.exports = Busquedas;
