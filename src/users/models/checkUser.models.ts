import { ArgsType, Field } from '@nestjs/graphql'

@ArgsType()
export class CheckUserRequest {
  @Field(() => String)
  email: string
}
