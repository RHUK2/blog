import { GrayMatterFile } from 'gray-matter';

export interface readMarkdownDataResponse extends GrayMatterFile<Buffer> {
  data: frontMatterData;
}

export interface frontMatterData {
  fileName?: string;
  updatedAt?: string;
  title?: string;
  tag?: string;
  isPublished?: string;
}

export interface readTagResponse {
  name: string;
  postCount: number;
}
