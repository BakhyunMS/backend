import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import * as nodemailer from 'nodemailer'

import prisma from 'src/client'
import { LoginResponse } from './models/login.models'
import { SendCodeResponse } from './models/sendCode.models'
import { VerifyCodeResponse } from './models/verifyCode.models'

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private configService: ConfigService) {}

  async login(email: string, password: string): Promise<LoginResponse> {
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.findFirst({
      where: {
        email,
        password: hashedPassword
      }
    })

    if (!user)
      return { ok: false, message: '존재하지 않는 이메일이거나 비밀번호가 일치하지 않습니다.' }

    return { ok: true, message: '' }
  }

  async sendCode(email: string): Promise<SendCodeResponse> {
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
        user: this.configService.get<string>('EMAIL'),
        pass: this.configService.get<string>('EMAIL_PW')
      }
    })

    try {
      transport.sendMail({
        from: this.configService.get<string>('EMAIL'),
        to: email,
        subject: '백현중학교 학생자치회 커뮤니티 인증',
        html: `
        백현중학교 학생자치회 커뮤니티에서 발송된 이메일입니다.<br />아래 코드를 통해 인증 절차를 완료하여 주세요.<br />
        <strong>${code}</strong><br/>
        해당 코드는 요청한 시간으로 부터 5분 뒤에 만료 됩니다.<br />만약 본인이 요청한 적이 없는 경우 해당 이메일을 무시해주세요.<br />
      `
      })
    } catch (error) {
      return { ok: false, message: error }
    }

    return { ok: true, message: '이메일을 성공적으로 전송하였습니다.' }
  }

  async verifyCode(email: string, code: string): Promise<VerifyCodeResponse> {
    const isCorrect = await prisma.verifiedEmails.findFirst({
      where: {
        email,
        code
      }
    })

    if (isCorrect) {
      const token = await this.jwtService.sign(
        { id: isCorrect.id },
        this.configService.get('JWT_SECRET')
      )

      return { ok: true, token }
    } else {
      return { ok: false, message: '코드가 일치하지 않습니다.' }
    }
  }
}
