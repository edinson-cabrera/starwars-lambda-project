import { APIGatewayProxyEvent } from "aws-lambda";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "src/app.module";
import { CreatePersonUseCase } from "src/application/usecases/create-person.usecase";
import { CharacterInterface } from "src/domain/interfaces/character.interface";
import { createPerson } from "src/main";
jest.mock("@nestjs/core");
jest.mock("./application/services/app.service");
jest.mock("./application/usecases/create-person.usecase");
jest.mock("./infrastructure/repositories/impl/app-dynamo-impl.repository");

describe("createPerson", () => {
  let createPersonUseCase: CreatePersonUseCase;

  beforeAll(async () => {
    const moduleRef = await NestFactory.createApplicationContext(AppModule);
    createPersonUseCase = moduleRef.get(CreatePersonUseCase);
  });

  it("should create a person successfully", async () => {
    const mockPerson: CharacterInterface = {
      people_id: "123",
      name: "Luke Skywalker",
      height: "172",
      mass: "77",
      hair_color: "blond",
      skin_color: "fair",
      eye_color: "blue",
      birth_year: "19BBY",
      gender: "male",
      homeworld: "Tatooine",
      films: [],
      species: [],
      vehicles: [],
      starships: [],
      created: "2024-10-31T00:00:00.000Z",
      edited: "2024-10-31T00:00:00.000Z",
      url: "http://swapi.dev/api/people/1/",
    };

    const event: APIGatewayProxyEvent = {
      body: JSON.stringify(mockPerson),
      headers: {},
      multiValueHeaders: {},
      httpMethod: "POST",
      isBase64Encoded: false,
      path: "/create",
      pathParameters: null,
      queryStringParameters: null,
      multiValueQueryStringParameters: null,
      stageVariables: null,
      requestContext: null,
      resource: "",
    };

    createPersonUseCase.execute = jest.fn().mockResolvedValue(mockPerson);

    const result = await createPerson(event);

    expect(result.statusCode).toBe(200);
    expect(JSON.parse(result.body)).toEqual(mockPerson);
  });

  it("should return an error if person data is invalid", async () => {
    const event: APIGatewayProxyEvent = {
      body: JSON.stringify({}),
      headers: {},
      multiValueHeaders: {},
      httpMethod: "POST",
      isBase64Encoded: false,
      path: "/create",
      pathParameters: null,
      queryStringParameters: null,
      multiValueQueryStringParameters: null,
      stageVariables: null,
      requestContext: null,
      resource: "",
    };

    createPersonUseCase.execute = jest.fn().mockImplementation(() => {
      throw new Error("El nombre y la URL son obligatorios");
    });

    const result = await createPerson(event);

    expect(result.statusCode).toBe(500);
    expect(JSON.parse(result.body)).toEqual({
      error: "El nombre y la URL son obligatorios",
    });
  });
});
