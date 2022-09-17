import { ArgsType, Field, Int, ObjectType } from '@nestjs/graphql'
import { Board, Response } from '../../types'

@ArgsType()
export class GetBoardPageRequest {
  @Field(() => Int)
  page: number

  @Field(() => String)
  type: string
}

@ObjectType()
export class GetBoardPageResponse extends Response {
  @Field(() => [Board], { nullable: true })
  data?: Board[]
}
