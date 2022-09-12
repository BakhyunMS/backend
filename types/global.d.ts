import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Response {
  @Field()
  ok: boolean

  @Field()
  message?: string
}
