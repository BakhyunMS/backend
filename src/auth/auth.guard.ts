import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { JwtService } from '@nestjs/jwt'
import prisma from 'src/client'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx: Context = GqlExecutionContext.create(context).getContext()
    const token = ctx.token
    if (token) {
      const data = this.jwtService.decode(token)
      if (typeof data === 'object' && data.hasOwnProverty('id')) {
        const user = await prisma.user.findFirst({
          where: {
            id: data.id
          }
        })
        if (user.id) return true
      } else return false
    } else return false
  }
}

interface Context {
  token: string
}
