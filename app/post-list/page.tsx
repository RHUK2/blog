import { getPostList } from "@/util";
import Link from "next/link";

interface PostListPageProps {
  params: {};
  searchParams: {};
}

export default async function PostListPage({
  params,
  searchParams,
}: PostListPageProps) {
  const data = await getPostList();
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
