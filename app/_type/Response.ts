import { GrayMatterFile } from 'gray-matter';
import { ChatData, frontMatterData } from './interface';

export interface readMarkdownDataResponse extends GrayMatterFile<Buffer> {
  data: frontMatterData;
}

export interface readFolderNameResponse {
  folderName: string;
}

export interface readTagResponse {
  name: string;
  postCount: number;
}

export interface useChatMutationResponse {
  chat: ChatData;
}
