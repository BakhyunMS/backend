import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Response {
  @Field(() => Boolean)
  ok: boolean

  @Field(() => String, { nullable: true })
  message?: string
}

@ObjectType()
export class User {
  @Field(() => ID)
  id: number

  @Field(() => String)
  email: string

  @Field(() => String)
  password: string

  @Field(() => String)
  studentId: string

  @Field(() => String)
  name: string

  @Field(() => Date)
  createdAt: Date

  @Field(() => String)
  role: string
}

@ObjectType()
export class Board {
  @Field(() => ID)
  id: number

  @Field(() => String)
  title: string

  @Field(() => String)
  content: string

  @Field(() => ID)
  authorId: number

  @Field(() => Date)
  createdAt: Date

  @Field(() => Date)
  updatedAt: Date

  @Field(() => String)
  type: string
}
