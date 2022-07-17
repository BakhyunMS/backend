import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { VerifyResponse } from 'src/users/models/verify.models'

@Injectable()
export class VerificationService {
  constructor(private jwtService: JwtService) {}

  async request(token: string): Promise<VerifyResponse> {
    const decodedToken = this.jwtService.verify(token)

    return { ok: true, message: decodedToken.email }
  }
}
