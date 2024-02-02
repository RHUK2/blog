import { getPostList } from "../(non-page)/util";

interface PostPageProps {
  params: {};
  searchParams: {
    directory: string;
  };
}

export default async function PostPage({
  params,
  searchParams,
}: PostPageProps) {
  const data = await getPostList(searchParams.directory);

  return (
    <h1 className="">
      {data.map((item) => (
        <div key={item.title}>{`${item.title} / ${item.description}`}</div>
      ))}
    </h1>
  );
}
