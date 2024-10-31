import { Module } from "@nestjs/common";
import { AppDynamoRepository } from "./infrastructure/repositories/impl/app-dynamo-impl.repository";
import { CreatePersonUseCase } from "./application/usecases/create-person.usecase";
import { GetPeopleUseCase } from "./application/usecases/get-people.usecase";

@Module({
  imports: [],
  controllers: [],
  providers: [
    AppDynamoRepository,
    // UseCases
    CreatePersonUseCase,
    GetPeopleUseCase,
  ],
  exports: [],
})
export class AppModule {}
