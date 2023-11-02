const fs = require('fs');
const axios = require('axios');

class Busquedas {

    historial = [];
    pathdb = './db/database.json';

    constructor() {
        // Leer la bd si existe
        this.leerBD();
    }

    get historialCapitalizado(){
        // Capitalizar
        return this.historial.map(lugares =>{
            let palabras =  lugares.split(' ');
            // de cada palabra la primera letra se vuelve en mayuscula y se le agrega el estro de la palabra
            palabras = palabras.map( palabra => palabra[0].toUpperCase() + palabra.substring(1))

            return palabras.join(' ')
        })
    }

    get paramsMapbox() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'lenguage': 'es',
        }   
    }

    get paramsWeather() {
        return {
            appid: process.env.OPENWEATHER_KEY,
            units: 'metric',
            lang: 'es',
        }   
    }

    // Metodo para buscar una ciudad 
    async ciudad(lugar = '') {

        try {
            // Peticion HTTP con axios a la api
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapbox,
            });

             // Regresa todos los lugares
            const respuesta = await instance.get();
            return respuesta.data.features.map( lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                longitud: lugar.center[0],
                latitud:  lugar.center[1],
            }));


        } catch (error) {
            return [];
        }

    }

    async climaLugar( lat, lon){
        try {
            // Instancia de axios.create()
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                // desestructurar para poder mandar lat y lon
                params: {...this.paramsWeather, lat, lon},
            });

            // Peticion de la repuesta
            const respuesta = await instance.get();
            // Desestructuracion para extraer lo que necesito
            const {weather, main} = respuesta.data;

            return{
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp,
            }
        } catch (error) {
            console.log(error);
        }
    }


    agregarHistorial(lugar = ''){
        //prevenir duplicados
        if(this.historial.includes( lugar.toLocaleLowerCase())){
            return;
        }
        //Ingresarlo al arreglo 
        this.historial.unshift(lugar.toLocaleLowerCase());

        // grabar en db/file
        this.guardarBD();

    }

    guardarBD(){
         const payload = {
            historial: this.historial
         };

         fs.writeFileSync(this.pathdb, JSON.stringify(payload));
    }

    leerBD(){
        // ver si existe sino ya por defecto es vacio
        if( !fs.existsSync(this.pathdb)) return;
        //  si si existe hacer esto
        const information = fs.readFileSync(this.pathdb, {encoding:'utf-8'});
        // regresr el formato a json
        const data = JSON.parse(information);

        this.historial =  data.historial;
    }

}

module.exports = Busquedas;