import { readFolderNameResponse, readMarkdownDataResponse, readTagResponse } from '@/_type';
import { readdir, readFile } from 'fs/promises';
import matter from 'gray-matter';
import path from 'path';
import { PAGE_SIZE } from './enum';

export const markdown_path = path.join(process.cwd(), 'public', 'markdown');

export async function readMarkdownDataList() {
  try {
    const markdownFolderNameList = (await readdir(markdown_path)).filter((content) => /^[^@.]*$/.test(content));

    const markdownContentList = await Promise.all(
      markdownFolderNameList.map((folderName) => readFile(`${markdown_path}/${folderName}/index.md`)),
    );

    const markdownDataList: readMarkdownDataResponse[] = markdownContentList
      .map((content) => matter(content))
      .filter((data) => !!data.data.isPublished);

    return markdownDataList;
  } catch (error) {
    console.error(error);
    throw new Error('readMarkdownMetaDataList error occurred.');
  }
}

export async function readTagList() {
  try {
    const markdownDataList = await readMarkdownDataList();
    console.log('🚀 ~ readTagList ~ markdownDataList:', markdownDataList);

    const tagList = markdownDataList
      .filter((metaData) => metaData.data.tag != null)
      .map((metaData) => metaData.data.tag?.split(',') ?? '')
      .flat()
      .map((tag) => tag.trim());

    const computedTagList = tagList.reduce<Record<string, number>>((obj, tag) => {
      obj[tag] = (obj[tag] || 0) + 1;
      return obj;
    }, {});

    const sortTagList = Object.entries(computedTagList)
      .map((tagArr) => ({ name: tagArr[0], postCount: tagArr[1] }))
      .sort((a, b) => a.name.localeCompare(b.name));

    const result: readTagResponse[] = [{ name: '', postCount: markdownDataList.length }, ...sortTagList];

    return result;
  } catch (error) {
    console.error(error);
    throw new Error('readTagList error occurred.');
  }
}

export async function readPostList(tag?: string, page?: string, size?: string) {
  try {
    let postList;

    if (tag == null || tag === '') postList = await readMarkdownDataList();
    else
      postList = (await readMarkdownDataList()).filter(
        (metaData) => metaData.data.tag != null && metaData.data.tag.includes(tag),
      );

    if (postList.length === 0) throw new Error('No data found.');

    const result = postList.slice(
      parseInt(page ?? '0') * parseInt(size ?? PAGE_SIZE),
      (parseInt(page ?? '0') + 1) * parseInt(size ?? PAGE_SIZE),
    );

    return {
      totalCount: postList.length,
      list: result,
    };
  } catch (error) {
    console.error(error);
    throw new Error('readPostList error occurred.');
  }
}

export async function readPost(folderName: string) {
  try {
    const post = await readFile(`${markdown_path}/${folderName}/index.md`, 'utf8');

    return matter(post).content;
  } catch (error) {
    console.error(error);
    throw new Error('readPost error occurred.');
  }
}
