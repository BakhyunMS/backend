import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { JoinRequest, JoinResponse } from './models/join.models'
import { SendCodeRequest, SendCodeResponse } from './models/sendCode.models'
import { VerifyCodeRequest, VerifyCodeResponse } from './models/verifyCode.models'
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

  @Mutation(() => SendCodeResponse)
  async sendCode(@Args() { email }: SendCodeRequest): Promise<SendCodeResponse> {
    return this.usersService.sendCode(email)
  }

  @Mutation(() => VerifyCodeResponse)
  async verifyCode(@Args() { email, code }: VerifyCodeRequest): Promise<VerifyCodeResponse> {
    return this.usersService.verifyCode(email, code)
  }
}
