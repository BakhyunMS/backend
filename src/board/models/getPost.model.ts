import { ArgsType, Field, ObjectType } from '@nestjs/graphql'
import { Board } from '@prisma/client'
import { Response } from 'types/global'

@ArgsType()
export class GetPostRequest {
  @Field()
  id: number
}

@ObjectType()
export class GetPostResponse extends Response {
  @Field()
  data?: Board
}
