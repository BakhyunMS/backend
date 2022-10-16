import { ArgsType, Field, ObjectType } from '@nestjs/graphql'
import { Response } from 'src/types'

@ArgsType()
export class LoginRequest {
  @Field(() => String)
  email: string

  @Field(() => String)
  password: string
}

@ObjectType()
export class LoginResponse extends Response {
  @Field(() => String, { nullable: true })
  token?: string
}
