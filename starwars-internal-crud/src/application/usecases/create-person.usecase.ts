import { Inject, Injectable } from "@nestjs/common";
import { APIGatewayProxyResult } from "aws-lambda";
import { CharacterInterface } from "src/domain/interfaces/character.interface";
import { AppDynamoRepository } from "src/infrastructure/repositories/impl/app-dynamo-impl.repository";
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class CreatePersonUseCase {
  constructor(
    @Inject(AppDynamoRepository)
    private readonly appDynamoRepository: AppDynamoRepository
  ) {}

  async execute(person: CharacterInterface): Promise<APIGatewayProxyResult>  {
    if (!person.name || !person.url) {
      throw new Error("El nombre y la URL son obligatorios");
    }

    person.people_id = uuidv4();

    const createdPerson = await this.appDynamoRepository.createPerson(person);
    return {
      statusCode: 200,
      body: JSON.stringify(createdPerson),
    }
  }
}
