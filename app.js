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
                    // prevenir error si no quiere seleccionar nada
                    if( idSelecc === '0') continue;                    
                const lugarSeleccionado = lugares.find( lugar => lugar.id === idSelecc );
                    busqueda.agregarHistorial(lugarSeleccionado.nombre)

                // Clima
                // necesito extreaer lat y lon del lugar seleccionado
                const climaLugar = await busqueda.climaLugar( lugarSeleccionado.latitud, lugarSeleccionado.longitud );

                // Mostrar resultados
                console.clear();
                console.log('\nInformacion de la ciudad\n'.green);
                console.log('Nombre:', lugarSeleccionado.nombre);
                console.log('Longitud:', lugarSeleccionado.longitud);
                console.log('Latitud:', lugarSeleccionado.latitud);
                console.log('Temperatura:', climaLugar.temp);
                console.log('Temp minima', climaLugar.min);
                console.log('Temp maxima',climaLugar.max);
                console.log('como esta el clima:',climaLugar.desc);
                
            break;
            
            case 2:
                console.log();
                busqueda.historial.forEach((lugar, i) =>{
                    const idx =`${ i+1}`.green;
                    console.log(`${idx} ${lugar}`);
                } )
            break;
            
        

        }

        if (opt !==0) await pausa();



    } while (opt !== 0);



}

main();





