import { Inject, Injectable } from "@nestjs/common";
import { AppRepository } from "../app.repository";
import { dynamoDBClient } from "../../lib/aws-config/dynamo-client";
import { CharacterInterface } from "src/domain/interfaces/character.interface";

const TABLE_NAME = "people";

@Injectable()
export class AppDynamoRepository implements AppRepository {
  constructor() {}

  async createPerson(person: CharacterInterface): Promise<CharacterInterface> {
    const params = {
      TableName: TABLE_NAME,
      Item: person,
    };
    await dynamoDBClient.put(params).promise();
    return person;
  }

  async getPerson(id: string): Promise<CharacterInterface> {
    const params = {
      TableName: TABLE_NAME,
      Key: { people_id: id },
    };
    const result = await dynamoDBClient.get(params).promise();
    return result.Item as CharacterInterface;
  }

  async updatePerson(
    id: string,
    person: Partial<CharacterInterface>
  ): Promise<CharacterInterface> {
    const updateExpression = Object.keys(person)
      .map((key) => `#${key} = :${key}`)
      .join(", ");
    const expressionAttributeNames = Object.keys(person).reduce(
      (acc, key) => ({ ...acc, [`#${key}`]: key }),
      {}
    );
    const expressionAttributeValues = Object.keys(person).reduce(
      (acc, key) => ({ ...acc, [`:${key}`]: person[key] }),
      {}
    );

    const params = {
      TableName: TABLE_NAME,
      Key: { people_id: id },
      UpdateExpression: `set ${updateExpression}`,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: "UPDATED_NEW",
    };
    const result = await dynamoDBClient.update(params).promise();
    return result.Attributes as CharacterInterface;
  }

  async deletePerson(id: string): Promise<{ id: string }> {
    const params = {
      TableName: TABLE_NAME,
      Key: { people_id: id },
    };
    await dynamoDBClient.delete(params).promise();
    return { id };
  }

  async listPersons(): Promise<CharacterInterface[]> {
    const params = {
      TableName: TABLE_NAME,
    };
    const result = await dynamoDBClient.scan(params).promise();
    return result.Items as CharacterInterface[];
  }
}
