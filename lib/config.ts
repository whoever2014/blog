// 站点身份配置。
// 线上网址通过环境变量 NEXT_PUBLIC_BASE_URL 注入（见 .github/workflows/deploy.yml），
// 源码里不硬编码任何 GitHub 用户名。
export const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const SITE_NAME = "Qilin's Blog";
export const SITE_DESCRIPTION = "Qilin 的个人博客";
export const AUTHOR = "Qilin";
