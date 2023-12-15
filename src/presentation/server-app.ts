import { CreateTable } from "../domain/use-cases/create-table.use-case";
import { SaveFile } from "../domain/use-cases/save-file.use-case";


interface RunOptions {
  base: number;
  limit: number;
  showTable: boolean;
  fileName: string;
  fileDestination: string;
}


//! Esta clase es la que va a orquestar mi aplicacion
export class ServerApp {

  static run({ base, limit, showTable, fileName, fileDestination }: RunOptions) {
    console.log('ServerApp Running ...');

    // Creo la tabla
    const table = new CreateTable().execute({ base, limit });

    // Guardo la tabla en un archivo
    const wasCreated = new SaveFile().execute({
      fileContent: table,
      // fileDestination: `outputs/table${base}`,
      // fileName: `table-${base}`
      fileDestination, // aca le estoy mandando el valor que recibo por linea de comandos con yargs
      fileName // aca le estoy mandando el valor que recibo por linea de comandos con yargs
    });


    wasCreated && console.log('File Created');
    !wasCreated && console.error('File Not Created');

    // Imprimo la tabla en consola si es necesario
    if (showTable) console.log(table);

  }

}