import { readFileSync, readdirSync } from "fs";
import { readdir, readFile } from "fs/promises";
import matter from "gray-matter";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

export async function getDirectoryList() {
  try {
    const directoryList = await readdir(`${process.cwd()}/public/post`);

    let allCount = 0;

    const result = await Promise.all(
      directoryList
        .filter((directory) => /^[^\.]*$/.test(directory))
        .map(async (directory) => {
          const postList = await readdir(
            `${process.cwd()}/public/post/${directory}`,
          );

          const count = postList.filter((directory) => /.*.md/.test(directory));

          allCount += count.length;

          return {
            folderName: directory,
            postCount: count.length,
          };
        }),
    );

    return [
      {
        folderName: "ALL",
        postCount: allCount,
      },
      ...result,
    ];
  } catch (err) {
    console.log(err);

    return [];
  }
}

export async function getPostList(directory?: string) {
  try {
    const postList = await readdir(`${process.cwd()}/public/post/${directory}`);

    const result = await Promise.all(
      postList
        .filter((post) => /.*.md/.test(post))
        .map(async (post) => {
          const content = await readFile(
            `${process.cwd()}/public/post/${directory}/${post}`,
            "utf8",
          );

          const { data } = matter(content);

          return data;
        }),
    );

    return result;
  } catch (err) {
    console.error(err);

    return [];
  }
}

export function getPost(directory: string, title: string) {
  try {
    const post = readFileSync(
      `${process.cwd()}/public/post/${directory}/${title}.md`,
      "utf8",
    );

    const result = unified()
      .use(remarkParse)
      .use(remarkRehype)
      .use(rehypeSlug)
      .use(rehypeStringify)
      .processSync(matter(post).content);

    return result.value;
  } catch (err) {
    console.error(err);

    return "";
  }
}
