import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
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

  @Query(() => String)
  sayHello(): string {
    return 'Hello World'
  }

  @Mutation(() => Response)
  async createPost(
    @Args() { title, content, authorId, type }: CreatePostRequest
  ): Promise<Response> {
    return this.boardService.createPost(title, content, authorId, type)
  }

  @Mutation(() => Response)
  async deletePost(@Args() { id }: DeletePostRequest): Promise<Response> {
    return this.boardService.deletePost(id)
  }

  @Mutation(() => FindPostResponse)
  async findPost(@Args() { title }: FindPostRequest): Promise<FindPostResponse> {
    return this.boardService.findPost(title)
  }

  @Mutation(() => GetBoardPageResponse)
  async getBoardPage(@Args() { page, type }: GetBoardPageRequest): Promise<GetBoardPageResponse> {
    return this.boardService.getBoardPage(page, type)
  }

  @Mutation(() => GetPostResponse)
  async getPost(@Args() { id }: GetPostRequest): Promise<GetPostResponse> {
    return this.boardService.getPost(id)
  }

  @Mutation(() => Response)
  async updatePost(@Args() { id, title, content }: UpdatePostRequest): Promise<Response> {
    return this.boardService.updatePost(id, title, content)
  }
}
