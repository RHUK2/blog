export type TChatModel = 'deepseek-chat' | 'deepseek-reasoner' | 'gpt-4o-mini' | 'chatgpt-4o-latest';

export type TChatRole = 'system' | 'user' | 'assistant';

export interface ITab {
  id: string;
  title: string;
}

export interface ITabListState {
  currentId: string;
  tabList: ITab[];
}

export interface IChat {
  role: TChatRole;
  content: string;
}

export interface IChatForm {
  userMessage: string;
  model: TChatModel;
}

export interface IChatListRequest {
  chatList: IChat[];
  model: TChatModel;
}
