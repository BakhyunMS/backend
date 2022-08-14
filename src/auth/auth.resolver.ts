import { Query, Mutation, Resolver, Args } from '@nestjs/graphql'
import { AuthService } from './auth.service'
import { LoginRequest, LoginResponse } from './models/login.models'
import { SendCodeRequest, SendCodeResponse } from './models/sendCode.models'
import { VerifyCodeRequest, VerifyCodeResponse } from './models/verifyCode.models'

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query(() => String)
  sayHello(): string {
    return 'Hello World'
  }

  @Mutation(() => LoginResponse)
  async login(@Args() { email, password }: LoginRequest): Promise<LoginResponse> {
    return this.authService.login(email, password)
  }

  @Mutation(() => VerifyCodeResponse)
  async sendCode(@Args() { code }: SendCodeRequest): Promise<SendCodeResponse> {
    return this.authService.sendCode(code)
  }

  @Mutation(() => VerifyCodeResponse)
  async verifyCode(@Args() { email, code }: VerifyCodeRequest): Promise<VerifyCodeResponse> {
    return this.authService.verifyCode(email, code)
  }
}
