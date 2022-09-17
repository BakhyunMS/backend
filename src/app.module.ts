import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { JwtModule } from '@nestjs/jwt'
import { join } from 'path'
import { AuthResolver } from './auth/auth.resolver'
import { AuthService } from './auth/auth.service'
import { UsersResolver } from './users/users.resolver'
import { UsersService } from './users/users.service'
import { BoardResolver } from './board/board.resolver'
import { BoardService } from './board/board.service'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({ req, connection }) => {
        return {
          token: req ? req.headers['token'] : connection.context['token']
        }
      }
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET') || ''
      }),
      inject: [ConfigService]
    })
  ],
  providers: [AuthResolver, UsersResolver, UsersService, AuthService, BoardResolver, BoardService],
  controllers: []
})
export class AppModule {}
