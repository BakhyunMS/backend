import { ArgsType, Field } from '@nestjs/graphql'

@ArgsType()
export class VerifyCodeRequest {
  @Field(() => String)
  email: string

  @Field(() => String)
  code: string

  @Field(() => String)
  password: string

  @Field(() => String)
  name: string

  @Field(() => String)
  studentId: string
}
