import { ArgsType, Field, ObjectType } from '@nestjs/graphql'
import { Board, BoardType } from '@prisma/client'
import { Response } from 'types/global'

@ArgsType()
export class GetBoardPageRequest {
  @Field()
  page: number

  @Field()
  type: BoardType
}

@ObjectType()
export class GetBoardPageResponse extends Response {
  @Field()
  data: Board[]
}
