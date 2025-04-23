'use server';

import { IMarkdownMeta, IMarkdownMetaListResponse, IMarkdownTagListResponse } from '@/_type';
import { readdir, readFile, writeFile } from 'fs/promises';
import matter from 'gray-matter';
import path from 'path';
import { v4 } from 'uuid';
import { PAGE_SIZE } from './enum';

const markdown_path = path.join(process.cwd(), 'public', 'markdown');
const meta_markdown_path = path.join(process.cwd(), 'public', 'markdown', 'list.json');

export async function writeMarkdownMetaList() {
  try {
    const markdownFolderNameList = (await readdir(markdown_path)).filter((content) => /^[^@.]*$/.test(content));

    const markdownContentList = await Promise.all(
      markdownFolderNameList.map((folderName) => readFile(`${markdown_path}/${folderName}/index.md`)),
    );

    const markdownDataList = markdownContentList
      .map((content) => ({ id: v4(), ...matter(content).data }) as IMarkdownMeta)
      .filter((data) => !!data.isPublished);

    await writeFile(meta_markdown_path, JSON.stringify(markdownDataList));
  } catch (error) {
    console.error(error);
    throw new Error('writeMarkdownMetaList error occurred.');
  }
}

export async function readTagList() {
  try {
    const markdownMetaList: IMarkdownMeta[] = await readFile(meta_markdown_path).then((value) =>
      JSON.parse(value.toString()),
    );

    const tagList = markdownMetaList
      .filter((metaData) => metaData.tag != null)
      .map((metaData) => metaData.tag?.split(',') ?? '')
      .flat()
      .map((tag) => tag.trim());

    const computedTagList = tagList.reduce<Record<string, number>>((obj, tag) => {
      obj[tag] = (obj[tag] || 0) + 1;
      return obj;
    }, {});

    const sortTagList = Object.entries(computedTagList)
      .map((tagArr) => ({ id: v4(), name: tagArr[0], postCount: tagArr[1] }))
      .sort((a, b) => a.name.localeCompare(b.name));

    const result: IMarkdownTagListResponse = {
      id: v4(),
      markdownTagList: [{ id: v4(), name: '', postCount: markdownMetaList.length }, ...sortTagList],
    };

    return result;
  } catch (error) {
    console.error(error);
    throw new Error('readTagList error occurred.');
  }
}

export async function readMarkdownMetaList(tag?: string, page?: string, size?: string) {
  try {
    let markdownMetaList: IMarkdownMeta[] = await readFile(meta_markdown_path).then((value) =>
      JSON.parse(value.toString()),
    );

    if (tag) {
      markdownMetaList = markdownMetaList.filter((metaData) => metaData.tag != null && metaData.tag.includes(tag));
    }

    if (markdownMetaList.length === 0) throw new Error('No data found.');

    markdownMetaList.sort((a, b) => new Date(b.updatedAt ?? '').getTime() - new Date(a.updatedAt ?? '').getTime());

    const computedMarkdownMetaList: IMarkdownMeta[] = markdownMetaList.slice(
      parseInt(page || '0') * parseInt(size ?? PAGE_SIZE),
      (parseInt(page || '0') + 1) * parseInt(size ?? PAGE_SIZE),
    );

    const result: IMarkdownMetaListResponse = {
      id: v4(),
      totalCount: markdownMetaList.length,
      markdownMetaList: computedMarkdownMetaList,
    };

    return result;
  } catch (error) {
    console.error(error);
    throw new Error('readMarkdownMetaList error occurred.');
  }
}

export async function readMarkdownContent(folderName: string) {
  try {
    const post = await readFile(`${markdown_path}/${folderName}/index.md`, 'utf8');

    return matter(post).content;
  } catch (error) {
    console.error(error);
    throw new Error('readMarkdownContent error occurred.');
  }
}
