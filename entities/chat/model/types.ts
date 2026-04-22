export type ChatModel = 'deepseek-chat' | 'deepseek-reasoner' | 'gpt-4o-mini' | 'chatgpt-4o-latest';

export type ChatRole = 'system' | 'user' | 'assistant';

export interface Tab {
  id: string;
  title: string;
}

export interface TabListState {
  currentId: string;
  tabList: Tab[];
}

export interface Chat {
  role: ChatRole;
  content: string;
}

export interface ChatForm {
  userMessage: string;
  model: ChatModel;
}

export interface ChatListRequest {
  chatList: Chat[];
  model: ChatModel;
}
