import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

prisma.$on('beforeExit', () => prisma.$disconnect())

export default prisma
