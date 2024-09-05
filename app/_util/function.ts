import { readdir, readFile } from 'fs/promises';
import matter from 'gray-matter';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';

export const FOLDER_NAME = 'archive';

export async function readDirectory() {
  return (await readdir(`${process.cwd()}/public/${FOLDER_NAME}`)).filter((directory) => /^[^\.]*$/.test(directory));
}

export async function readMarkdownInDirectory(directory: string) {
  return (await readdir(`${process.cwd()}/public/${FOLDER_NAME}/${directory}`)).filter((file) => /.*.md/.test(file));
}

export async function readMarkdownFrontMatter(directory: string, post: string) {
  const content = await readFile(`${process.cwd()}/public/${FOLDER_NAME}/${directory}/${post}`, 'utf8');

  const frontMatter = matter(content);

  return frontMatter.data;
}

export async function getNavigationList() {
  try {
    let allCount = 0;

    const directoryList = await readDirectory();

    const result = await Promise.all(
      directoryList.map(async (directory) => {
        const postList = await readMarkdownInDirectory(directory);

        allCount += postList.length;

        return {
          name: directory,
          count: postList.length,
        };
      }),
    );

    return [
      {
        name: '',
        count: allCount,
      },
      ...result,
    ];
  } catch (err) {
    console.error('getNavigationList');
    console.error(err);

    return [];
  }
}

export async function getPostList(directory?: string, page?: string) {
  try {
    if (directory == null || directory === '') {
      const directoryList = await readDirectory();

      const result = (
        await Promise.all(
          directoryList.map(async (directory) => {
            const postList = await readMarkdownInDirectory(directory);

            const data = await Promise.all(
              postList.map(async (post) => {
                return await readMarkdownFrontMatter(directory, post);
              }),
            );

            return data;
          }),
        )
      ).flat();

      return result;
    } else {
      const postList = await readMarkdownInDirectory(directory);

      const result = await Promise.all(
        postList.map(async (post) => {
          return await readMarkdownFrontMatter(directory, post);
        }),
      );

      return result;
    }
  } catch (err) {
    console.error('getPostList');
    console.error(err);

    return [];
  }
}

export async function getPost(directory: string, title: string) {
  try {
    const post = await readFile(`${process.cwd()}/public/${FOLDER_NAME}/${directory}/${title}.md`, 'utf8');

    const result = await unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkRehype)
      .use(rehypeHighlight)
      .use(rehypeSlug)
      .use(rehypeStringify)
      .process(matter(post).content);

    return result.value;
  } catch (err) {
    console.error('getPost');
    console.error(err);

    return '';
  }
}
