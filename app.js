require('dotenv').config()
const {inquirerMenu, pausa, leerInput, listarLugares, confirmar, mostrarListadoCheckList} = require('./helpers/inquirer.js');
const Busquedas = require('./models/busquedas.js');


const main = async() => {

    let opt;
    const busqueda = new Busquedas();

    do {
        opt = await inquirerMenu();
        
        switch (opt) {
            case 1:
                // Mostrar mensaje
                const lugaresABuscar = await leerInput('Ingrese la ciudad a buscar:');
                // Buscar lugares
                const lugares = await busqueda.ciudad(lugaresABuscar);
                // Seleccionar lugar
                const idSelecc = await listarLugares(lugares);
                const lugarSeleccionado = lugares.find( lugar => lugar.id === idSelecc );
                // Clima
                // Mostrar resultados
                console.log('\nInformacion de la ciudad\n'.green);
                console.log('Nombre:', lugarSeleccionado.nombre);
                console.log('Longitud:', lugarSeleccionado.longitud);
                console.log('Latitud:', lugarSeleccionado.latitud);
                console.log('');
                console.log('');
                console.log('');
                
            break;
            
            case 2:
                
            break;
            
        

        }

        if (opt !==0) await pausa();



    } while (opt !== 0);



}

main();





