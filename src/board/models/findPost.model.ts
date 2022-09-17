import { ArgsType, Field, ObjectType } from '@nestjs/graphql'
import { Board, Response } from '../../types'

@ArgsType()
export class FindPostRequest {
  @Field(() => String)
  title: string
}

@ObjectType()
export class FindPostResponse extends Response {
  @Field(() => [Board], { nullable: true })
  data?: Board[]
}
