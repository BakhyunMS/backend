import { ArgsType, Field } from '@nestjs/graphql'
import { BoardType } from '@prisma/client'

@ArgsType()
export class CreatePostRequest {
  @Field()
  title: string

  @Field()
  content: string

  @Field()
  authorId: number

  @Field()
  type: BoardType
}
