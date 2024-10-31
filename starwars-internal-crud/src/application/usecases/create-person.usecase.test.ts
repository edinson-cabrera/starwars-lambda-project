import { CreatePersonUseCase } from "./create-person.usecase";
import { AppDynamoRepository } from "src/infrastructure/repositories/impl/app-dynamo-impl.repository";
import { CharacterInterface } from "src/domain/interfaces/character.interface";

jest.mock("src/infrastructure/repositories/impl/app-dynamo-impl.repository");
jest.mock("uuid", () => ({
  v4: jest.fn().mockReturnValue("1234-5678-91011-1213"),
}));

describe('CreatePersonUseCase', () => {
  let createPersonUseCase: CreatePersonUseCase;
  let appDynamoRepository: jest.Mocked<AppDynamoRepository>;

  beforeEach(() => {
    appDynamoRepository = new AppDynamoRepository() as jest.Mocked<AppDynamoRepository>;
    createPersonUseCase = new CreatePersonUseCase(appDynamoRepository);
  });

  it('should create a person successfully', async () => {
    const mockPerson: CharacterInterface = {
      people_id: '1234-5678-91011-1213',
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
      hair_color: 'blond',
      skin_color: 'fair',
      eye_color: 'blue',
      birth_year: '19BBY',
      gender: 'male',
      homeworld: 'Tatooine',
      films: [],
      species: [],
      vehicles: [],
      starships: [],
      created: '2024-10-31T00:00:00.000Z',
      edited: '2024-10-31T00:00:00.000Z',
      url: 'http://swapi.dev/api/people/1/',
    };

    appDynamoRepository.createPerson.mockResolvedValue(mockPerson);

    const result = await createPersonUseCase.execute(mockPerson);

    expect(result.statusCode).toBe(200);
    expect(JSON.parse(result.body)).toEqual(mockPerson);
    expect(appDynamoRepository.createPerson).toHaveBeenCalledWith(mockPerson);
  });

  it('should throw an error if name or url is missing', async () => {
    const invalidPerson: Partial<CharacterInterface> = {
      height: '172',
      mass: '77',
    };

    const result = await createPersonUseCase.execute(invalidPerson as CharacterInterface);

    expect(result.statusCode).toBe(500);
    expect(JSON.parse(result.body)).toEqual({
      message: 'El nombre y la URL son obligatorios',
    });
  });
});