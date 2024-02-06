"use client";

import mermaid from "mermaid";
import React, { useEffect } from "react";

export async function Mermaid({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    mermaid.initialize({ startOnLoad: false });

    async function run() {
      await mermaid.run({
        querySelector: ".language-mermaid",
      });
    }

    run();
  }, []);

  return <>{children}</>;
}
