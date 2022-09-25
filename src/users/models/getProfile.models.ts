import { ArgsType, Field, ID, ObjectType } from '@nestjs/graphql'
import { Response, User } from '../../types'

@ArgsType()
export class GetProfileRequest {
  @Field(() => ID)
  id: number
}

@ObjectType()
export class GetProfileResponse extends Response {
  @Field(() => User, { nullable: true })
  data?: User
}
