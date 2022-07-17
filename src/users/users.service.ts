import { BadRequestException, Injectable } from '@nestjs/common'
import prisma from 'src/client'
import * as bcrypt from 'bcrypt'
import { JoinResponse } from './models/join.models'
import { VerifyResponse } from './models/verify.models'
import { JwtService } from '@nestjs/jwt'
import * as nodemailer from 'nodemailer'
import { emailFormat, host } from 'src/constant'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class UsersService {
  constructor(private jwtService: JwtService, private configService: ConfigService) {}

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

    if (data) {
      return { ok: true, message: '유저 등록에 성공하였습니다.' }
    } else {
      return { ok: false, message: '유저 등록에 실패하였습니다.' }
    }
  }

  async verifyEmail(email: string): Promise<VerifyResponse> {
    if (!emailFormat.test(email)) return { ok: false, message: '이메일 형식이 잘못되었습니다.' }
    const token = this.jwtService.sign(
      { email },
      {
        expiresIn: '300000'
      }
    )
    const link = `${host}/verification?token=${token}`
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

    await transport.sendMail({
      from: this.configService.get<string>('EMAIL'),
      to: email,
      subject: '백현중학교 학생자치회 커뮤니티 인증',
      html: `
        <div>
          백현중학교 학생 자치회 커뮤니티에 이메일을 인증하기 위해서 <strong>5분 내에</strong> 아래 링크에 접속하여 주세요.
          <br />
          만약 해당 이메일과 관련이 없으시다면 이메일을 무시하여 주세요.
          <br />
          <a href=${link}>${link}</a>
        </div>
      `
    })

    return { ok: true, message: '이메일을 성공적으로 전송하였습니다.' }
  }
}
