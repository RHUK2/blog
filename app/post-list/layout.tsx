import { Navigation } from "../(non-page)/component";

export default function PostLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="flex">
      <section className="min-w-[192px]">
        <Navigation />
      </section>
      <section className="flex-[1_0_0]">{children}</section>
    </section>
  );
}
