export interface MarkdownMeta {
  id: string;
  folderName: string;
  updatedAt: string;
  title: string;
  tag: string;
  isPublished: string;
}

export type MarkdownMetaList = MarkdownMeta[];

export interface MarkdownMetaListResponse {
  id: string;
  totalCount: number;
  markdownMetaList: MarkdownMetaList;
}

export interface MarkdownTag {
  id: string;
  name: string;
  postCount: number;
}

export type MarkdownTagList = MarkdownTag[];

export interface MarkdownTagListResponse {
  id: string;
  markdownTagList: MarkdownTagList;
}
