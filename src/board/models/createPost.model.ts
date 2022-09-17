import { ArgsType, Field } from '@nestjs/graphql'

@ArgsType()
export class CreatePostRequest {
  @Field(() => String)
  title: string

  @Field(() => String)
  content: string

  @Field(() => Number)
  authorId: number

  @Field(() => String)
  type: string
}
