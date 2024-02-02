import Link from "next/link";

export function Header() {
  return (
    <header className="fixed z-50 w-full border-b bg-stone-50 ">
      <div className="m-auto flex h-12 w-full min-w-[320px] max-w-[1024px] items-center justify-between  px-5 ">
        <Link href="/" className="block tracking-tighter">
          RHUK2
        </Link>
        <div className="flex ">
          <Link
            href="/"
            className="block min-w-20 text-center tracking-tighter hover:tracking-wider"
          >
            🏠HOME
          </Link>
          <Link
            href="/post-list"
            className=" block min-w-20 text-center tracking-tighter hover:tracking-wider"
          >
            📚POST
          </Link>
        </div>
      </div>
    </header>
  );
}
