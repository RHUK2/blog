import { ChatData } from './interface';

export interface useChatMutationBody {
  chat: ChatData[];
  model: 'gpt-4o-mini' | 'chatgpt-4o-latest';
}
