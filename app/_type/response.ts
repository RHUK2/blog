import { ChatData } from './interface';

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
