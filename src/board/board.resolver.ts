import { Query, Resolver } from '@nestjs/graphql'

@Resolver()
export class BoardResolver {
  @Query(() => String)
  sayHello(): string {
    return 'Hello World'
  }
}
