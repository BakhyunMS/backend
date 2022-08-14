import { ArgsType, Field, ObjectType } from '@nestjs/graphql'

@ArgsType()
export class SendCodeRequest {
  @Field()
  code: string
}

@ObjectType()
export class SendCodeResponse {
  @Field()
  ok: boolean

  @Field()
  message?: string
}
