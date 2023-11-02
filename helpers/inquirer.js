const inquirer = require('inquirer');
const colors = require('colors')

const menuOptions = [
    {
        type: 'list',
        name: 'opcion',
        message: 'Que desea hacer?',
        choices: [
            {
                value: 1,
                name: `${'1.'.green} Buscar ciudad`,
            },
            {
                value: 2,
                name: `${'2.'.green} Ver historial`,
            },
            {
                value: 0,
                name: `${'3.'.green} Salir`,
            },
        ]
    }
];


const inquirerMenu = async() => {

    // console.clear();
    console.log('==========================='.green);
    console.log('   Seleccione una Opcion ');
    console.log('===========================\n'.green);

    const {opcion} = await inquirer.prompt(menuOptions)
    return opcion;
 
}

const pausa = async() =>{

    const questions = [
        {
            type: 'input',
            name: 'Enter',
            message: `Presione ${ 'Enter'.green} para continuar`
        }
    ];

    console.log('\n');
    await inquirer.prompt(questions)
    console.clear();
}

// leee el input de la primera opcion
const leerInput  = async(message) => {

    const questionInitial = [
        {
            type: 'input',
            name: 'desc',
            message, 
            validate(value){
                if( value.length === 0 ){
                    return 'Ingrese una tarea';
                }
                return true;
            }
        }
    ];

    // Desestructurar para poder ver lla descr que es lo que necesitamos
    const {desc} = await inquirer.prompt(questionInitial);
    return desc;
}

// Para ver opciones de borrado
const listarLugares = async( lugares = [] ) =>{

    const choices = lugares.map( (lugar, i) => {

        const idx = `${ i+1}.`.green

        return {
            value: lugar.id,
            name: `${idx} ${lugar.nombre}`
        }
    } );

    choices.unshift({
        value: '0',
        name: '0'.green + ' Cancelar'
    })

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Seleccione lugar:',  
            choices
        }
    ]
    
    const {id} = await inquirer.prompt(preguntas);
    return id;


}

const confirmar = async(message) =>{

    const pregunta = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const {ok} = await inquirer.prompt(pregunta);
    return ok;
}


const mostrarListadoCheckList = async( tareas = [] ) =>{

    const choices = tareas.map( (tarea, i) => {

        const idx = `${ i+1}.`.green

        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: ( tarea.completadoEn ) ? true : false
        }
    } );

    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',  
            choices
        }
    ]
    
    const {ids} = await inquirer.prompt(pregunta);
    return ids;


}

module.exports = {inquirerMenu, pausa, leerInput, listarLugares, confirmar, mostrarListadoCheckList};