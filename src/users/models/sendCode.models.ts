import { ArgsType, Field } from '@nestjs/graphql'

@ArgsType()
export class SendCodeRequest {
  @Field(() => String)
  email: string
}
