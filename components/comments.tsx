"use client";

import { useEffect, useRef } from "react";

// giscus：留言存放在 whoever2014/blog 的 GitHub Discussions（Announcements 分类）中。
export function Comments() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container || container.hasChildNodes()) return;

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    const attrs: Record<string, string> = {
      "data-repo": "whoever2014/blog",
      "data-repo-id": "R_kgDOQ-r8Wg",
      "data-category": "Announcements",
      "data-category-id": "DIC_kwDOQ-r8Ws4DGu2u",
      "data-mapping": "pathname",
      "data-strict": "1",
      "data-reactions-enabled": "1",
      "data-emit-metadata": "0",
      "data-input-position": "top",
      "data-theme": "transparent_dark",
      "data-lang": "zh-CN",
      "data-loading": "lazy",
    };
    for (const [key, value] of Object.entries(attrs)) {
      script.setAttribute(key, value);
    }
    container.appendChild(script);
  }, []);

  return <div ref={ref} className="giscus" />;
}
