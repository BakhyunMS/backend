import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Response } from 'src/types'
import { JoinRequest } from './models/join.models'
import { SendCodeRequest } from './models/sendCode.models'
import { VerifyCodeRequest } from './models/verifyCode.models'
import { UsersService } from './users.service'

@Resolver()
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => String)
  sayHello(): string {
    return 'Hello World'
  }

  @Mutation(() => Response)
  async join(@Args() { email, password, name, studentId }: JoinRequest): Promise<Response> {
    return this.usersService.join(email, password, name, studentId)
  }

  @Mutation(() => Response)
  async sendCode(@Args() { email }: SendCodeRequest): Promise<Response> {
    return this.usersService.sendCode(email)
  }

  @Mutation(() => Response)
  async verifyCode(@Args() { email, code }: VerifyCodeRequest): Promise<Response> {
    return this.usersService.verifyCode(email, code)
  }
}
