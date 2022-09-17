import { ArgsType, Field, ID } from '@nestjs/graphql'

@ArgsType()
export class UpdatePostRequest {
  @Field(() => ID)
  id: number

  @Field(() => String, { nullable: true })
  title?: string

  @Field(() => String, { nullable: true })
  content?: string
}
