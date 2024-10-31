import { Inject } from "@nestjs/common";
import { APIGatewayProxyResult } from "aws-lambda";
import { AppDynamoRepository } from "src/infrastructure/repositories/impl/app-dynamo-impl.repository";

export class GetPeopleUseCase {
  constructor(
    @Inject(AppDynamoRepository)
    private readonly appDynamoRepository: AppDynamoRepository) {}

  async execute(): Promise<APIGatewayProxyResult> {
    const response = await this.appDynamoRepository.listPersons();
    return {
      statusCode: 200,
      body: JSON.stringify(response),
    };
  }
}
