import fs from 'fs';

export interface SaveFileUseCase {
  execute: (options: SaveFileOptions) => boolean;
}

export interface SaveFileOptions {
  fileContent: string;
  fileDestination?: string;
  fileName?: string;
}

export class SaveFile implements SaveFileUseCase {

  constructor() {
    //** repository: StorageRepository */

  }


  execute({
    fileContent,
    fileDestination = "outputs",
    fileName = "table"
  }: SaveFileOptions): boolean {

    try {
      // creo carpeta si no existe
      fs.mkdirSync(fileDestination, { recursive: true });

      // grabo el archivo
      fs.writeFileSync(`${fileDestination}/${fileName}.txt`, fileContent, { encoding: "utf-8" });

      // console.log('File Created');
      return true; // Si todo salio bien -> devuelvo true
    }
    catch (error: any | string) {
      // Si hay un error -> logueo y devuelvo false
      // console.log(error.stack.split("\n", 1).join(""));
      // console.log(error); // hay que ponerlo en winston para que no genere ruido
      return false;
    }

  }

}