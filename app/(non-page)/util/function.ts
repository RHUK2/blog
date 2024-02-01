import { readFile, readFileSync, readdirSync } from "fs";
import matter from "gray-matter";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

export function getDirectoryList() {
  try {
    const directoryList = readdirSync(`${process.cwd()}/public/Markdown`);

    return directoryList;
  } catch (err) {
    console.log(err);

    return [];
  }
}

export function getPostList(directory: string) {
  try {
    const postList = readdirSync(
      `${process.cwd()}/public/Markdown/${directory}`,
    );

    const result = postList
      .filter((post) => /.*.md/.test(post))
      .map((post) => {
        const content = readFileSync(
          `${process.cwd()}/public/Markdown/${directory}/${post}`,
          "utf8",
        );
        const { data } = matter(content);
        return data;
      });

    return result;
  } catch (err) {
    console.error(err);

    return [];
  }
}

export function getPost(directory: string, title: string) {
  try {
    const post = readFileSync(
      `${process.cwd()}/public/Markdown/${directory}/${title}.md`,
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
