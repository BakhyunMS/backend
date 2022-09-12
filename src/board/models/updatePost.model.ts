import { ArgsType, Field } from '@nestjs/graphql'

@ArgsType()
export class UpdatePostRequest {
  @Field()
  id: number

  @Field()
  updateData: UpdatePostData
}

export interface UpdatePostData {
  title?: string
  content?: string
}
