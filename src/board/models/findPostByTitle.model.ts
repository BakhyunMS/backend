import { ArgsType, Field, ObjectType } from '@nestjs/graphql'
import { Board } from '@prisma/client'
import { Response } from 'types/global'

@ArgsType()
export class FindPostByTitleRequest {
  @Field()
  title: string
}

@ObjectType()
export class FindPostByTitleResponse extends Response {
  @Field()
  data: Board[]
}
