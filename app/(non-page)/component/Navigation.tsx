import Link from "next/link";
import { getDirectoryList } from "../util";

export async function Navigation() {
  const directoryList = await getDirectoryList();

  return (
    <nav className="flex flex-col">
      {directoryList.map((directory) => (
        <Link
          href={`/post-list?directory=${directory.folderName}`}
          key={directory.folderName}
          className="inline-block"
        >{`${directory.folderName}(${directory.postCount})`}</Link>
      ))}
    </nav>
  );
}
