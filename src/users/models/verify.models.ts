import { ArgsType, Field, ObjectType } from '@nestjs/graphql'

@ArgsType()
export class VerifyRequest {
  @Field()
  email: string
}

@ObjectType()
export class VerifyResponse {
  @Field()
  ok: boolean

  @Field()
  message?: string
}
