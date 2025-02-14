'use server';

import { IMarkdownMeta, IMarkdownMetaListResponse, IMarkdownTagListResponse } from '@/_type';
import { readdir, readFile, writeFile } from 'fs/promises';
import matter from 'gray-matter';
import path from 'path';
import { PAGE_SIZE } from './enum';

const markdown_path = path.join(process.cwd(), 'public', 'markdown');
const meta_markdown_path = path.join(process.cwd(), 'public', 'markdown', 'list.json');

export async function writeMarkdownMetaList() {
  try {
    const markdownFolderNameList = (await readdir(markdown_path)).filter((content) => /^[^@.]*$/.test(content));

    const markdownContentList = await Promise.all(
      markdownFolderNameList.map((folderName) => readFile(`${markdown_path}/${folderName}/index.md`)),
    );

    const markdownDataList: IMarkdownMeta[] = markdownContentList
      .map((content) => matter(content).data)
      .filter((data) => !!data.isPublished);

    await writeFile(meta_markdown_path, JSON.stringify(markdownDataList));
  } catch (error) {
    console.error(error);
    throw new Error('writeMarkdownMetaList error occurred.');
  }
}

// const meta_markdown_path2 = path.join(process.cwd(), 'public', 'markdown', 'list2.json');

// export async function writeSearchIndexing() {
//   try {
//     const markdownFolderNameList = (await readdir(markdown_path)).filter((content) => /^[^@.]*$/.test(content));

//     const markdownContentList = await Promise.all(
//       markdownFolderNameList.map((folderName) => readFile(`${markdown_path}/${folderName}/index.md`)),
//     );

//     const markdownDataList = markdownContentList
//       .filter((content) => !!matter(content).data.isPublished)
//       .map((content) => matter(content).content);

//     const index = {};

//     function buildIndex(articles: string[]) {
//       articles.forEach((article, id) => {
//         const words = article.toLowerCase().split(/\s+/);
//         words.forEach((word) => {
//           if (!index[word]) {
//             index[word] = [];
//           }
//           if (!index[word].includes(id)) {
//             index[word].push(id);
//           }
//         });
//       });
//     }

//     buildIndex(markdownDataList);

//     function search(query) {
//       const words = query.toLowerCase().split(/\s+/);
//       const results = new Set();

//       words.forEach((word) => {
//         if (index[word]) {
//           index[word].forEach((id) => results.add(id));
//         }
//       });

//       return Array.from(results).map((id) => markdownDataList[id]);
//     }

//     console.log(search('정규화란?'));

//     await writeFile(meta_markdown_path2, JSON.stringify(index));
//   } catch (error) {
//     console.error(error);
//     throw new Error('writeMarkdownMetaList error occurred.');
//   }
// }

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
      .map((tagArr) => ({ name: tagArr[0], postCount: tagArr[1] }))
      .sort((a, b) => a.name.localeCompare(b.name));

    const result: IMarkdownTagListResponse = {
      markdownTagList: [{ name: '', postCount: markdownMetaList.length }, ...sortTagList],
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

    const computedMarkdownMetaList: IMarkdownMeta[] = markdownMetaList.slice(
      parseInt(page ?? '0') * parseInt(size ?? PAGE_SIZE),
      (parseInt(page ?? '0') + 1) * parseInt(size ?? PAGE_SIZE),
    );

    const result: IMarkdownMetaListResponse = {
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
