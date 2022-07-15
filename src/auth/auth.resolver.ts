import { Mutation, Resolver } from '@nestjs/graphql'
import { JwtService } from '@nestjs/jwt'
import { LoginResponse } from './models/login.models'

@Resolver()
export class AuthResolver {
  constructor() {}

  @Mutation(() => LoginResponse)
  async login() {}
}
