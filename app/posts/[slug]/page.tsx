import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import { getPostBySlug, getPostSlugs } from "@/lib/mdx";
import { AUTHOR, BASE_URL, SITE_NAME } from "@/lib/config";
import { Comments } from "@/components/comments";
import type { Metadata } from "next";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const url = `${BASE_URL}/posts/${slug}/`;

  return {
    title: post.title,
    description: post.description,
    authors: [{ name: AUTHOR }],
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "article",
      locale: "zh_CN",
      url,
      siteName: SITE_NAME,
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      authors: [AUTHOR],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <header className="mb-10">
        <h1 className="mb-3 text-3xl font-semibold leading-tight md:text-4xl">
          {post.title}
        </h1>
        <time className="text-sm text-muted-foreground">
          {new Date(post.date).toLocaleDateString("zh-CN", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
      </header>

      <article
        className="prose prose-invert prose-neutral max-w-none
          prose-headings:font-semibold
          prose-a:text-[var(--link)] prose-a:no-underline hover:prose-a:underline
          prose-blockquote:border-l-2 prose-blockquote:border-[color:var(--border)]
          prose-blockquote:not-italic prose-blockquote:font-normal
          prose-blockquote:text-muted-foreground
          prose-code:rounded prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5
          prose-code:before:content-none prose-code:after:content-none
          prose-pre:bg-muted prose-pre:border prose-pre:border-[color:var(--border)]"
      >
        <MDXRemote
          source={post.content}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [
                [
                  rehypePrettyCode,
                  { theme: "github-dark", keepBackground: false },
                ],
              ],
            },
          }}
        />
      </article>

      <section className="mt-16 border-t border-border pt-8">
        <h2 className="mb-6 text-lg font-semibold">留言</h2>
        <Comments />
      </section>

      <div className="mt-12 border-t border-border pt-8">
        <Link
          href="/"
          className="text-sm text-muted-foreground no-underline hover:text-foreground"
        >
          ← 返回首页
        </Link>
      </div>
    </div>
  );
}
