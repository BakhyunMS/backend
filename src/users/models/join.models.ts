import { ArgsType, Field } from '@nestjs/graphql'

@ArgsType()
export class JoinRequest {
  @Field(() => String)
  email: string

  @Field(() => String)
  password: string

  @Field(() => String)
  name: string

  @Field(() => String)
  studentId: string
}
