import { CharacterInterface } from "src/domain/interfaces/character.interface";

export abstract class AppRepository {
  abstract createPerson(
    person: CharacterInterface
  ): Promise<CharacterInterface>;
  abstract getPerson(id: string): Promise<any>;
  abstract updatePerson(
    id: string,
    person: Partial<CharacterInterface>
  ): Promise<CharacterInterface>;
  abstract deletePerson(id: string): Promise<{
    id: string;
  }>;
  abstract listPersons(): Promise<CharacterInterface[]>;
}
