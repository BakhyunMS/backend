import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { JoinRequest, JoinResponse } from './models/join.models'
import { UsersService } from './users.service'

@Resolver()
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => String)
  sayHello(): string {
    return 'Hello World'
  }

  @Mutation(() => JoinResponse)
  async join(@Args() { email, password, name, studentId }: JoinRequest): Promise<JoinResponse> {
    return this.usersService.join(email, password, name, studentId)
  }
}
