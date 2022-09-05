import { Query, Mutation, Resolver, Args } from '@nestjs/graphql'
import { AuthService } from './auth.service'
import { LoginRequest, LoginResponse } from './models/login.models'

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
}
