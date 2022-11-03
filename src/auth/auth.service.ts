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
    const user = await prisma.user.findFirst({
      where: {
        email
      }
    })
    if (!user) return { ok: false, message: '존재하지 않는 이메일입니다.' }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)

    if (!isPasswordCorrect) return { ok: false, message: '비밀번호가 일치하지 않습니다.' }

    const token = await this.jwtService.sign({ id: user.id })

    return { ok: true, message: '로그인 되었습니다.', token }
  }
}
