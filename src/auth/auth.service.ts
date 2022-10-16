import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'

import prisma from 'src/client'
import { LoginResponse } from './models/login.models'

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private configService: ConfigService) {}

  async login(email: string, password: string): Promise<LoginResponse> {
    const existingUser = await prisma.user.findFirst({
      where: {
        email
      }
    })
    const user = await prisma.user.findFirst({
      where: {
        email,
        password: await bcrypt.hash(password, 10)
      }
    })

    if (!existingUser) return { ok: false, message: '존재하지 않는 이메일입니다.' }
    if (!user) return { ok: false, message: '비밀번호가 일치하지 않습니다.' }

    const token = await this.jwtService.sign({ id: user.id }, this.configService.get('JWT_SECRET'))

    return { ok: true, message: '로그인 되었습니다.', token }
  }
}
