import { describe, test, expect, beforeEach, afterEach, jest, beforeAll, afterAll, } from '@jest/globals';
import { SaveFile } from './save-file.use-case';
import fs from 'fs';
// import mock from 'mock-fs'; // paquete mock-fs




describe("CreateTableUseCase", () => {

  // beforeEach(() => {
  //   jest.clearAllMocks(); // Esta linea funciona para los mocks de tipo jest.fn().  Pero NO FUNCIONA PARA LOS SPY (spyOn)
  // });

  const clean = () => {
    if (fs.existsSync('outputs')) fs.rmSync('outputs', { recursive: true });
    if (fs.existsSync('custom-output')) fs.rmSync('custom-output', { recursive: true, });
    if (fs.existsSync('output-error')) fs.rmSync('output-error', { recursive: true });
  };

  beforeEach(() => {
    clean();
  });

  afterEach(() => {
    clean();
  });

  afterAll(() => {
    // clean();
  });






  test("should save file with default value", () => {

    // Arrange
    const saveFile = new SaveFile();
    const filePath = 'outputs/table.txt';
    const options = {
      fileContent: 'Hola mundo' // no importa lo que le mande, solo quiero saber si se creo el archivo
    };

    // Act
    const result = saveFile.execute(options);
    const checkFile = fs.existsSync(filePath);
    const content = fs.readFileSync(filePath, 'utf-8');

    // Assert
    expect(result).toBe(true);
    expect(checkFile).toBe(true);
    expect(content).toBe('Hola mundo');

    // Clean
    // fs.unlinkSync(filePath);


  });


  test("should save file with custom value", () => {

    // Arrange

    const saveFile = new SaveFile();

    const options = {
      fileContent: 'Hola mundo',
      fileDestination: 'custom-output/file-destination',
      fileName: "custom-table-name"
    };

    const filePath = `${options.fileDestination}/${options.fileName}.txt`; // custom-output/file-destination/custom-table-name.txt

    // Act
    const result = saveFile.execute(options);
    const checkFile = fs.existsSync(filePath);
    const content = fs.readFileSync(filePath, 'utf-8');

    // Assert
    expect(result).toBe(true);
    expect(checkFile).toBe(true);
    expect(content).toBe('Hola mundo');

    // Clean
    // fs.unlinkSync(filePath); // esto al final lo hago con las jest functions beforeEach y afterEach


  });


  test("should return false if directory could not be created", () => {

    // Arrange
    const spy = jest
      .spyOn(fs, "mkdirSync") //writeFileSync
      .mockImplementation(
        () => { throw new Error('Este error es para probar que se llamo a la funcion mkdirSync'); }
      );


    const saveFile = new SaveFile();
    const options = {
      fileContent: 'Hola mundo' // no importa lo que le mande, solo quiero saber si se creo el archivo
    };

    // Act
    const result = saveFile.execute(options);
    // const checkFile = fs.existsSync(filePath);


    // Assert
    expect(result).toBe(false);
    // expect(checkFile).toBe(false);
    expect(spy).toHaveBeenCalled();
    // expect(spy).toHaveBeenCalledWith('outputs', { recursive: true });


    // Clean Spy
    //! Esto es para RESTAURAR la funcion mkdirSync de Date para que devuelva el valor que corresponde
    spy.mockRestore();
    // clean();
  });


  test("should return false if file could not be created", () => {

    // Arrange
    const spy = jest
      .spyOn(fs, "writeFileSync")
      .mockImplementation(() => {
        throw new Error('Este error es para probar que se llamo a la funcion writeFileSync');
      });



    // paquete mock-fs
    // mock({
    //   'output-error': {
    //     'custom-table-name.txt': mock.file({
    //       content: 'Hola mundo',
    //       mode: 0o000, // <- esto es para que el archivo no tenga permisos de escritura
    //     })
    //     // 'custom-table-name.txt': 'file content here',
    //     // 'empty-dir': {/** empty directory */ }

    //   },
    //   // 'path/to/some.png': Buffer.from([8, 6, 7, 5, 3, 0, 9]),
    //   // 'some/other/path': {/** another empty directory */ }
    // }, {
    //   // add this option otherwise node-glob returns an empty string!
    //   createCwd: false
    // });



    const saveFile = new SaveFile();
    const options = {
      fileContent: 'Hola mundo',
      fileDestination: 'output-error',
      fileName: "custom-table-name"
    };

    // Act
    const result = saveFile.execute(options);



    // Assert
    expect(result).toBe(false);
    // expect(spy).toHaveBeenCalled();



    // Clean Spy
    //! Esto es para RESTAURAR la funcion mkdirSync de Date para que devuelva el valor que corresponde
    spy.mockRestore();



  });



});


