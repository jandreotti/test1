import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';




// export const yarg = yargs(process.argv)
//   .parseSync();

export const yarg = yargs(hideBin(process.argv)) //! hideBin: oculta el primer elemento del array
  //! OPCIONES
  .option('b', {
    alias: 'base',
    type: 'number',
    demandOption: true,
    describe: 'Es la base de la tabla de multiplicar'

  })
  .option('l', {
    alias: 'limit',
    type: 'number',
    default: 10,
    describe: 'Es el limite de la tabla de multiplicar'
  })
  .option('s', {
    alias: 'show',
    type: 'boolean',
    default: false,
    describe: 'Muestra la tabla en consola'
  })

  .option("n", {
    alias: "name",
    type: "string",
    default: "multiplication-table",
    describe: "Nombre del archivo"
  })
  .option("d", {
    alias: "destination",
    type: "string",
    default: "outputs",
    describe: "Carpeta de destino"
  })

  //! VALIDACIONES
  .check((
    argv, // argv: es un objeto que contiene todos los argumentos que se han configurado
    options // options: es un objeto que contiene todas las opciones que se han configurado
  ) => {
    // console.log({ argv, options });

    if (argv.b < 1) throw new Error('La base tiene que ser mayor a 0');

    if (argv.l < 1) throw new Error('El limite tiene que ser mayor a 0');

    return true;
  })


  //! parseSync: para que se ejecute la configuracion de yargs
  .parseSync();



// console.log(process.env); // variables de entorno
// console.log(process.argv); // argumentos de la linea de comandos



