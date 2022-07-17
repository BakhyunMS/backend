import { Controller, Get, Query } from '@nestjs/common'
import { VerificationService } from './verification.service'

@Controller('verification')
export class VerificationController {
  constructor(private verificationService: VerificationService) {}

  @Get()
  request(@Query() query) {
    this.verificationService.request(query.token)
  }
}
