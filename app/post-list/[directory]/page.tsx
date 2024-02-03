import { getPostList } from "@/util";
import Link from "next/link";

interface PostListDirectoryPageProps {
  params: {
    directory: string;
  };
  searchParams: {};
}

export default async function PostListDirectoryPage({
  params,
  searchParams,
}: PostListDirectoryPageProps) {
  const data = await getPostList(params.directory);

  return (
    <section className="flex flex-col gap-2">
      {data.map((item, index) => (
        <Link
          className="inline-block"
          key={`post_${index}`}
          href={`/post-list/${item.directory}/${item.title}`}
        >{`제목: ${item.title ?? "-"}`}</Link>
      ))}
    </section>
  );
}
