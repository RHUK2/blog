'use client';

import mermaid from 'mermaid';
import { useEffect, useRef } from 'react';

interface Props {
  chart: string;
}

let idCounter = 0;

export function MermaidDiagram({ chart }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const idRef = useRef(`mermaid-${++idCounter}`);

  useEffect(() => {
    if (!ref.current) return;

    const isDark = document.documentElement.classList.contains('dark');

    mermaid.initialize({
      startOnLoad: false,
      theme: isDark ? 'dark' : 'default',
    });

    mermaid
      .render(idRef.current, chart)
      .then(({ svg }) => {
        if (ref.current) ref.current.innerHTML = svg;
      })
      .catch((err) => {
        if (ref.current) ref.current.textContent = String(err);
      });
  }, [chart]);

  return <div ref={ref} className='my-4 flex justify-center' />;
}
