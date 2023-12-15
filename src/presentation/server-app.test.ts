import { describe, test, expect, beforeEach, afterEach, jest, beforeAll, afterAll, } from '@jest/globals';
import { ServerApp } from './server-app';
import { CreateTable, CreateTableOptions, CreateTableUseCase } from '../domain/use-cases/create-table.use-case';
import { SaveFile, SaveFileOptions } from '../domain/use-cases/save-file.use-case';

describe("Test server-app.ts", () => {

  test("should create ServerApp intance", () => {

    const serverApp = new ServerApp();

    expect(serverApp).toBeInstanceOf(ServerApp);
    expect(typeof ServerApp.run).toBe("function");
  });

  test("should call ServerApp.run with options", () => {

    // Arrange
    const runSpy = jest.spyOn(ServerApp, "run");
    const logSpy = jest.spyOn(console, "log");
    const createTableSpy = jest.spyOn(CreateTable.prototype, "execute");
    const saveFileSpy = jest.spyOn(SaveFile.prototype, "execute");


    const options = {
      base: 2,
      limit: 10,
      showTable: false,
      fileName: "test-destination",
      fileDestination: "test-filename"
    };

    // Act
    ServerApp.run(options);

    // Assert
    expect(runSpy).toHaveBeenCalled();
    expect(runSpy).toHaveBeenCalledWith(options);

    expect(logSpy).toHaveBeenCalledWith("ServerApp Running ...");
    expect(logSpy).toHaveBeenCalledWith("File Created");
    // expect(logSpy).toHaveBeenCalledTimes(2);

    expect(createTableSpy).toHaveBeenCalled();
    expect(createTableSpy).toHaveBeenCalledWith({ base: options.base, limit: options.limit });

    expect(saveFileSpy).toHaveBeenCalled();
    expect(saveFileSpy).toHaveBeenCalledWith({
      //   fileContent: createTableSpy.mock.results[0].value, // aca le estoy mandando el valor que recibo como resultado de la funcion createTableSpy (es el valor que retorna la funcion execute de la clase CreateTable) -> return tabla;
      fileContent: expect.any(String),
      fileDestination: options.fileDestination,
      fileName: options.fileName
    });

  });

  test("should call ServerApp.run with custom values mocked", () => {

    // Arrange
    const options = {
      base: 2,
      limit: 10,
      showTable: false,
      fileName: "test-destination",
      fileDestination: "test-filename"
    };

    const logMock = jest.fn();
    const logErrorMock = jest.fn();
    const createMock = jest.fn().mockReturnValue("tabla") as (opt: CreateTableOptions) => string;
    const saveFileMock = jest.fn().mockReturnValue(true) as (opt: SaveFileOptions) => boolean;

    console.log = logMock;
    console.error = logErrorMock;
    CreateTable.prototype.execute = createMock;
    SaveFile.prototype.execute = saveFileMock;

    // Act
    ServerApp.run(options);


    // Assert
    expect(logMock).toHaveBeenCalledWith("ServerApp Running ...");
    expect(logMock).toHaveBeenCalledWith("File Created");
    expect(logMock).toHaveBeenCalledTimes(2);

    expect(createMock).toHaveBeenCalled();
    expect(createMock).toHaveBeenCalledWith({ base: options.base, limit: options.limit });

    expect(saveFileMock).toHaveBeenCalled();
    expect(saveFileMock).toHaveBeenCalledWith({
      fileContent: (createMock as jest.Mock).mock.results[0].value, // aca le estoy mandando el valor que recibo como resultado de la funcion createMock (es el valor que retorna la funcion execute de la clase CreateTable) -> return tabla;
      fileDestination: options.fileDestination,
      fileName: options.fileName
    });

    expect(logErrorMock).not.toHaveBeenCalled();


    //Clean
    // jest.clearAllMocks();


  });

});