import { getPost } from "@/util";

interface PostListDirectoryTitlePageProps {
  params: {
    directory: string;
    title: string;
  };
  searchParams: {};
}

export default async function PostListDirectoryTitlePage({
  params,
  searchParams,
}: PostListDirectoryTitlePageProps) {
  const data = await getPost(params.directory, params.title);

  return (
    <section className="prose flex flex-col gap-2">
      <div
        dangerouslySetInnerHTML={{
          __html: data,
        }}
      ></div>
    </section>
  );
}
