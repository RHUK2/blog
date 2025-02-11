export interface IMarkdownMeta {
  folderName?: string;
  updatedAt?: string;
  title?: string;
  tag?: string;
  isPublished?: string;
}

export interface IMarkdownMetaListResponse {
  totalCount: number;
  markdownMetaList: IMarkdownMeta[];
}

export interface IMarkdownTag {
  name: string;
  postCount: number;
}

export interface IMarkdownTagListResponse {
  markdownTagList: IMarkdownTag[];
}
