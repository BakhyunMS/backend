import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { PrismaClient } from '@prisma/client'
import 'dotenv/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  await app.listen(3000)
}

PrismaClient.$connect().then(() => bootstrap())
