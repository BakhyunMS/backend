import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import prisma from 'src/client'
import * as bcrypt from 'bcrypt'
import { JoinResponse } from './models/join.models'
import { VerifyResponse } from './models/verify.models'

@Injectable()
export class UsersService {
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

    if (isExistingUser) throw new BadRequestException('존재하는 이메일입니다.')

    const data = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        studentId
      }
    })

    if (data) return { ok: true, message: '유저 등록에 성공하였습니다.' }

    return { ok: false, message: '유저 등록에 실패하였습니다.' }
  }

  async verifyEmail(email: string): Promise<VerifyResponse> {
    return { ok: false }
  }
}
