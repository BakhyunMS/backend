import prisma from 'src/client'

import { Injectable } from '@nestjs/common'
import { GetBoardPageResponse } from './models/getBoardPage.model'
import { GetPostResponse } from './models/getPost.model'
import { Response } from '../types'
import { FindPostResponse } from './models/findPost.model'

@Injectable()
export class BoardService {
  async getBoardPage(page: number, type: string): Promise<GetBoardPageResponse> {
    if (
      !(type === 'Rights') &&
      !(type === 'Sports') &&
      !(type === 'Campaign') &&
      !(type === 'General') &&
      !(type === 'Main')
    )
      return { ok: false, message: '서버 내부의 오류가 발생하였습니다.' }
    const data = await prisma.board.findMany({
      skip: (page - 1) * 10,
      take: 10,
      where: {
        type
      }
    })
    if (!data) return { ok: false, message: '서버 내부에 오류가 발생하였습니다.' }
    else if (data.length === 0) return { ok: true, data: [] }
    else return { ok: true, data }
  }

  async getPost(id: number): Promise<GetPostResponse> {
    const data = await prisma.board.findFirst({
      where: {
        id
      }
    })
    if (data) return { ok: true, data }
    else return { ok: false, message: '서버 내부에 오류가 발생하였습니다.' }
  }

  async findPost(title: string): Promise<FindPostResponse> {
    const data = await prisma.board.findMany({
      where: {
        title: {
          contains: title
        }
      }
    })
    if (!data) return { ok: false, message: '서버 내부에 오류가 발생하였습니다.' }
    else if (data.length === 0) return { ok: true, data: [] }
    else return { ok: true, data }
  }

  async createPost(
    title: string,
    content: string,
    authorId: number,
    type: string
  ): Promise<Response> {
    if (
      !(type === 'Rights') &&
      !(type === 'Sports') &&
      !(type === 'Campaign') &&
      !(type === 'General') &&
      !(type === 'Main')
    )
      return { ok: false, message: '서버 내부의 오류가 발생하였습니다.' }
    const data = await prisma.board.create({
      data: {
        title,
        content,
        authorId,
        type
      }
    })
    if (!data) return { ok: false, message: '서버 내부에 오류가 발생하였습니다.' }
    else return { ok: true, message: '글이 성공적으로 등록되었습니다.' }
  }

  async updatePost(id: number, title: string, content: string): Promise<Response> {
    if (!title && !content) return { ok: false, message: '변경 사항이 없습니다.' }
    const data = await prisma.board.update({
      where: {
        id
      },
      data: {
        title,
        content
      }
    })
    if (!data) return { ok: false, message: '서버 내부에 오류가 발생하였습니다.' }
    else return { ok: true, message: '글이 성공적으로 수정되었습니다.' }
  }

  async deletePost(id: number): Promise<Response> {
    const data = await prisma.board.delete({
      where: {
        id
      }
    })
    if (!data) return { ok: false, message: '서버 내부에 오류가 발생하였습니다.' }
    else return { ok: true, message: '글이 성공적으로 삭제되었습니다.' }
  }
}
