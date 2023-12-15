
// Reglas que tiene que cumplir
export interface CreateTableUseCase {
  execute: (options: CreateTableOptions) => string;

}

export interface CreateTableOptions {
  base: number;
  limit?: number;
}





export class CreateTable implements CreateTableUseCase {

  // constructor -> DI -> Inyeccion de dependencias (dependencias externas)
  constructor() {
    // console.log('CreateTable constructor ...');
  }

  // Aqui ejecutamos el caso de uso -> use case
  execute({ base, limit = 10 }: CreateTableOptions) {
    let tabla = "";

    for (let i = 1; i <= limit; i++) {
      tabla += `${base} x ${i} = ${base * i}`;

      if (i < limit) {
        tabla += "\n";
      }
    }

    return tabla;
  }

}