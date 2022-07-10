import { NestFactory } from '@nestjs/core'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { AppModule } from './app.module'
import 'dotenv/config'
import prisma from './client'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), {
    logger: ['debug', 'error', 'log', 'verbose', 'warn']
  })
  await app.listen(3000)
}

prisma.$connect().then(() => bootstrap())
