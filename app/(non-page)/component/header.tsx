import Link from "next/link";

export function Header() {
  return (
    <header className="fixed w-full border-b ">
      <div className="bg-white z-50 px-5 flex items-center justify-between h-12 m-auto w-full min-w-[320px] max-w-[1024px] ">
        <Link href="/" className="block tracking-tighter">
          RHUK2
        </Link>
        <div className="flex ">
          <Link
            href="/"
            className="min-w-20 text-center block tracking-tighter hover:tracking-wider"
          >
            🏠HOME
          </Link>
          <Link
            href="/post"
            className=" min-w-20 text-center block tracking-tighter hover:tracking-wider"
          >
            📚POST
          </Link>
        </div>
      </div>
    </header>
  );
}
