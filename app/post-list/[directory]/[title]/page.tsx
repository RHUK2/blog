import { Mermaid } from "@/component/client";
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
  const data = await getPost(
    params.directory,
    decodeURIComponent(params.title),
  );

  return (
    <section className="flex flex-col gap-2">
      <Mermaid>
        <article
          className="prose"
          dangerouslySetInnerHTML={{
            __html: data,
          }}
        />
      </Mermaid>
    </section>
  );
}
