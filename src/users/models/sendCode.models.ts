import { ArgsType, Field, ObjectType } from '@nestjs/graphql'

@ArgsType()
export class SendCodeRequest {
  @Field()
  email: string
}

@ObjectType()
export class SendCodeResponse {
  @Field()
  ok: boolean

  @Field()
  message?: string
}
