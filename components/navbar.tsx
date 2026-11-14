import Link from "next/link";
import { GAME_URL, SITE_NAME } from "@/lib/config";

export function Navbar() {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex max-w-2xl items-baseline justify-between px-6 py-6">
        <Link
          href="/"
          className="text-xl font-semibold text-foreground no-underline hover:no-underline"
        >
          {SITE_NAME}
        </Link>
        <nav className="flex gap-4 text-sm">
          <Link
            href="/"
            className="text-muted-foreground no-underline hover:text-foreground hover:no-underline"
          >
            首页
          </Link>
          <a
            href={GAME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground no-underline hover:text-foreground hover:no-underline"
          >
            魔塔
          </a>
        </nav>
      </div>
    </header>
  );
}
