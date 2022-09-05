import { ArgsType, Field, ObjectType } from '@nestjs/graphql'

@ArgsType()
export class LoginRequest {
  @Field()
  email: string

  @Field()
  password: string
}

@ObjectType()
export class LoginResponse {
  @Field()
  ok: boolean

  @Field()
  message?: string

  @Field()
  token?: string
}
