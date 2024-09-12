import { GrayMatterFile } from 'gray-matter';

export interface readMarkdownMetaDataResponse extends GrayMatterFile<Buffer> {
  data: frontMatterData;
}

export interface frontMatterData {
  fileName?: string;
  updatedAt?: string;
  title?: string;
  description?: string;
  tag?: string;
}

export interface readTagResponse {
  name: string;
  postCount: number;
}
