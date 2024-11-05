import { GrayMatterFile } from 'gray-matter';

export interface readMarkdownDataResponse extends GrayMatterFile<Buffer> {
  data: frontMatterData;
}

export interface frontMatterData {
  folderName?: string;
  updatedAt?: string;
  title?: string;
  tag?: string;
  isPublished?: string;
}

export interface readFolderNameResponse {
  folderName: string;
}

export interface readTagResponse {
  name: string;
  postCount: number;
}

export interface useChatMutationResponse {
  message: Message;
}

export interface Message {
  content: string;
}
