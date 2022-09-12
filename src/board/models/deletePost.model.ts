import { ArgsType, Field } from '@nestjs/graphql'

@ArgsType()
export class DeletePostRequest {
  @Field()
  id: number
}
