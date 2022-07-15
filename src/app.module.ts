import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'
import { AppService } from './app.service'
import { AuthResolver } from './auth/auth.resolver'
import { UsersResolver } from './users/users.resolver'
import { UsersService } from './users/users.service'

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({ req }) => ({ req })
    })
  ],
  providers: [AppService, AuthResolver, UsersResolver, UsersService]
})
export class AppModule {}
