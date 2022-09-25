import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { AuthGuard } from '../auth/auth.guard'
import { Response } from '../types'
import { BoardService } from './board.service'
import { CreatePostRequest } from './models/createPost.model'
import { DeletePostRequest } from './models/deletePost.model'
import { FindPostRequest, FindPostResponse } from './models/findPost.model'
import { GetBoardPageRequest, GetBoardPageResponse } from './models/getBoardPage.model'
import { GetPostRequest, GetPostResponse } from './models/getPost.model'
import { UpdatePostRequest } from './models/updatePost.model'

@Resolver()
export class BoardResolver {
  constructor(private boardService: BoardService) {}

  @Query(() => GetPostResponse)
  async getPost(@Args() { id }: GetPostRequest): Promise<GetPostResponse> {
    return this.boardService.getPost(id)
  }

  @Query(() => FindPostResponse)
  async findPost(@Args() { title }: FindPostRequest): Promise<FindPostResponse> {
    return this.boardService.findPost(title)
  }

  @Query(() => GetBoardPageResponse)
  async getBoardPage(@Args() { page, type }: GetBoardPageRequest): Promise<GetBoardPageResponse> {
    return this.boardService.getBoardPage(page, type)
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Response)
  async createPost(
    @Args() { title, content, authorId, type }: CreatePostRequest
  ): Promise<Response> {
    return this.boardService.createPost(title, content, authorId, type)
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Response)
  async updatePost(@Args() { id, title, content }: UpdatePostRequest): Promise<Response> {
    return this.boardService.updatePost(id, title, content)
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Response)
  async deletePost(@Args() { id }: DeletePostRequest): Promise<Response> {
    return this.boardService.deletePost(id)
  }
}
