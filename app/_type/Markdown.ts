export interface IMarkdownMeta {
  id: string;
  folderName: string;
  updatedAt: string;
  title: string;
  tag: string;
  isPublished: string;
}

export type TMarkdownMetaList = IMarkdownMeta[];

export interface IMarkdownMetaListResponse {
  id: string;
  totalCount: number;
  markdownMetaList: TMarkdownMetaList;
}

export interface IMarkdownTag {
  id: string;
  name: string;
  postCount: number;
}

export type TMarkdownTagList = IMarkdownTag[];

export interface IMarkdownTagListResponse {
  id: string;
  markdownTagList: TMarkdownTagList;
}
