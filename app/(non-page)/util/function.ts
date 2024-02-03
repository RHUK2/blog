import { readdir, readFile } from "fs/promises";
import matter from "gray-matter";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

export async function readDirectory() {
  return (await readdir(`${process.cwd()}/public/post`)).filter((directory) =>
    /^[^\.]*$/.test(directory),
  );
}

export async function readMarkdownInDirectory(directory: string) {
  return (await readdir(`${process.cwd()}/public/post/${directory}`)).filter(
    (file) => /.*.md/.test(file),
  );
}

export async function readMarkdownFrontMatter(directory: string, post: string) {
  const content = await readFile(
    `${process.cwd()}/public/post/${directory}/${post}`,
    "utf8",
  );

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
        name: "",
        count: allCount,
      },
      ...result,
    ];
  } catch (err) {
    console.error(err);

    return [];
  }
}

export async function getPostList(directory?: string) {
  try {
    if (directory == null) {
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
    console.error(err);

    return [];
  }
}

export async function getPost(directory: string, title: string) {
  try {
    const post = await readFile(
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
