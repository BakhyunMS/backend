import * as bcrypt from 'bcrypt'
import * as nodemailer from 'nodemailer'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import prisma from '../client'
import { emailFormat } from '../constant'
import { Response } from 'src/types'
@Injectable()
export class UsersService {
  constructor(private configService: ConfigService) {}

  async join(email: string, password: string, name: string, studentId: string): Promise<Response> {
    const existingUser = await prisma.user.findFirst({
      select: {
        id: true
      },
      where: {
        email
      }
    })

    if (existingUser.id) return { ok: false, message: '존재하는 이메일입니다.' }
    if (!emailFormat.test(email)) return { ok: false, message: '이메일 형식이 잘못되었습니다.' }
    if (email.substring(email.indexOf('@')) !== 'bakhyun.ms.kr')
      return { ok: false, message: '백현중학교 이메일이 아닙니다.' }

    const data = await prisma.user.create({
      data: {
        email,
        password: await bcrypt.hash(password, 10),
        name,
        studentId
      }
    })

    if (data.id) {
      return { ok: true, message: '회원 가입에 성공하였습니다.' }
    } else {
      return { ok: false, message: '내부 오류로 인해 회원가입에 실패하였습니다.' }
    }
  }

  async sendCode(email: string): Promise<Response> {
    const now = new Date(Date.now())
    let code = ''

    now.setMinutes(now.getMinutes() + 5)

    for (let i = 0; i < 6; i++) {
      const randomNumber = String(Math.floor(Math.random() * 9 + 1))
      code += randomNumber
    }

    await prisma.verifiedEmails.create({
      data: {
        email,
        code,
        expiresAt: String(now.toISOString())
      }
    })

    const transport = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: this.configService.get('EMAIL'),
        pass: this.configService.get('EMAIL_PW')
      }
    })

    try {
      transport.sendMail({
        from: this.configService.get('EMAIL'),
        to: email,
        subject: '백현중학교 학생자치회 커뮤니티 인증',
        html: `
        백현중학교 학생자치회 커뮤니티에서 발송된 이메일입니다.<br />아래 코드를 통해 남은 절차를 완료하여 주세요.<br />
        <strong>${code}</strong><br/>
        해당 코드는 요청한 시간으로 부터 5분 뒤에 만료 됩니다.<br />만약 본인이 요청한 적이 없는 경우 해당 이메일을 무시해주세요.<br />
      `
      })
    } catch (error) {
      return { ok: false, message: error }
    }

    return { ok: true, message: '이메일을 성공적으로 전송하였습니다.' }
  }

  async verifyCode(email: string, code: string): Promise<Response> {
    const now = new Date(Date.now())
    const isCorrect = await prisma.verifiedEmails.findFirst({
      where: {
        email,
        code
      }
    })

    if (!isCorrect) return { ok: false, message: '코드가 일치하지 않습니다.' }

    if (isCorrect.expiresAt.getTime() < now.getTime())
      return { ok: false, message: '코드가 만료되었습니다.' }

    return { ok: true, message: '회원가입에 성공하였습니다.' }
  }
}
