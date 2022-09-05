import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import 'dotenv/config'
import prisma from './client'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  await app.listen(4000)
}

prisma.$connect().then(() => bootstrap())
