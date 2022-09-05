import { ArgsType, Field, ObjectType } from '@nestjs/graphql'

@ArgsType()
export class VerifyCodeRequest {
  @Field()
  email: string

  @Field()
  code: string
}

@ObjectType()
export class VerifyCodeResponse {
  @Field()
  ok: boolean

  @Field()
  message?: string
}
