import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as bcrypt from 'bcrypt'

import prisma from 'src/client'
import { emailFormat } from 'src/constant'
import { JoinResponse } from './models/join.models'

@Injectable()
export class UsersService {
  constructor(private configService: ConfigService) {}

  async join(
    email: string,
    password: string,
    name: string,
    studentId: string
  ): Promise<JoinResponse> {
    const hashedPassword = await bcrypt.hash(password, 10)
    const isExistingUser = await prisma.user.findFirst({
      select: {
        id: true
      },
      where: {
        email
      }
    })

    if (isExistingUser) return { ok: false, message: '존재하는 이메일입니다.' }
    if (!emailFormat.test(email)) return { ok: false, message: '이메일 형식이 잘못되었습니다.' }

    const data = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        studentId
      }
    })

    if (data) {
      return { ok: true, message: '유저 등록에 성공하였습니다.' }
    } else {
      return { ok: false, message: '내부 오류로 인해 회원가입에 실패하였습니다.' }
    }
  }
}
