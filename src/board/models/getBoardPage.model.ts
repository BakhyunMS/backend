import { ArgsType, Field, ObjectType } from '@nestjs/graphql'
import { Board } from '@prisma/client'
import { Response } from 'types/global'

@ArgsType()
export class GetBoardPageRequest {
  @Field()
  page: number

  @Field()
  type: string
}

@ObjectType()
export class GetBoardPageResponse extends Response {
  @Field()
  data: Board[]
}
