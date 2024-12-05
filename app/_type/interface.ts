export interface frontMatterData {
  folderName?: string;
  updatedAt?: string;
  title?: string;
  tag?: string;
  isPublished?: string;
}

export interface ChatData {
  role: 'system' | 'user' | 'assistant';
  content: string;
}
