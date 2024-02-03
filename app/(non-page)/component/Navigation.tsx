import Link from "next/link";
import { getNavigationList } from "../util";

export async function Navigation() {
  const directoryList = await getNavigationList();

  return (
    <nav className="flex flex-col">
      {directoryList.map((directory) => (
        <Link
          href={`/post-list${directory.name ? `/${directory.name}` : ""}`}
          key={directory.name}
          className="inline-block"
        >{`${directory.name ? directory.name : "ALL"}(${directory.count})`}</Link>
      ))}
    </nav>
  );
}
