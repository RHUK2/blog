'use client';

import mermaid from 'mermaid';
import React, { useEffect } from 'react';

export function Mermaid({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    mermaid.initialize({ startOnLoad: false });

    // 현재 client componet에서 async/await을 지원하지 않음
    mermaid
      .run({
        querySelector: '.language-mermaid',
      })
      .then();
  }, []);

  return <>{children}</>;
}
