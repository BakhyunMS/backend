import { ArgsType, Field, ID, ObjectType } from '@nestjs/graphql'
import { Board, Response } from '../../types'

@ArgsType()
export class GetPostRequest {
  @Field(() => ID)
  id: number
}

@ObjectType()
export class GetPostResponse extends Response {
  @Field(() => [Board], { nullable: true })
  data?: Board
}
