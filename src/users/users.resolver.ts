import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Response } from 'src/types'
import { GetProfileRequest } from './models/getProfile.models'
import { CheckUserRequest } from './models/checkUser.models'
import { SendCodeRequest } from './models/sendCode.models'
import { VerifyCodeRequest } from './models/verifyCode.models'
import { UsersService } from './users.service'

@Resolver()
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => String)
  getProfile(@Args() { id }: GetProfileRequest): Promise<Response> {
    return this.usersService.getProfile(id)
  }

  @Mutation(() => Response)
  async sendCode(@Args() { email }: SendCodeRequest): Promise<Response> {
    return this.usersService.sendCode(email)
  }

  @Mutation(() => Response)
  async checkUser(@Args() { email }: CheckUserRequest): Promise<Response> {
    return this.usersService.checkUser(email)
  }

  @Mutation(() => Response)
  async verifyCode(
    @Args()
    { email, code, password, name, studentId }: VerifyCodeRequest
  ): Promise<Response> {
    return this.usersService.verifyCode(email, code, password, name, studentId)
  }
}
