import { ArgsType, Field, ObjectType } from '@nestjs/graphql'

@ArgsType()
export class JoinRequest {
  @Field()
  email: string

  @Field()
  password: string

  @Field()
  name: string

  @Field()
  studentId: string
}

@ObjectType()
export class JoinResponse {
  @Field()
  ok: boolean

  @Field()
  message?: string
}
