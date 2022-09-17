import { ArgsType, Field, ID } from '@nestjs/graphql'

@ArgsType()
export class DeletePostRequest {
  @Field(() => ID)
  id: number
}
