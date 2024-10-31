import { Inject, Injectable } from "@nestjs/common";
import { APIGatewayProxyResult } from "aws-lambda";
import { randomUUID } from "crypto";
import { CharacterInterface } from "src/domain/interfaces/character.interface";
import { AppDynamoRepository } from "src/infrastructure/repositories/impl/app-dynamo-impl.repository";
@Injectable()
export class CreatePersonUseCase {
  constructor(
    @Inject(AppDynamoRepository)
    private readonly appDynamoRepository: AppDynamoRepository
  ) {}

  async execute(person: CharacterInterface): Promise<APIGatewayProxyResult> {
    try {
      if (!person.name || !person.url) {
        throw new Error("El nombre y la URL son obligatorios");
      }

      person.people_id = randomUUID();

      const createdPerson = await this.appDynamoRepository.createPerson(person);
      return {
        statusCode: 200,
        body: JSON.stringify(createdPerson),
      };
    } catch (e) {
      return {
        statusCode: 500,
        body: JSON.stringify({ message: e.message }),
      };
    }
  }
}
