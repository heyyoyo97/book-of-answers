# 答案之书 (Book of Answers)

一个交互式的网页应用，模拟翻书动画并显示随机答案。

## 项目版本

本项目有两个版本：

1. **主分支 (main)**: 使用 React + Next.js + Tailwind CSS 实现的现代版本
   - 使用了现代前端技术栈
   - 包含了更多动画效果和交互
   - 响应式设计

2. **原始版本 (vanilla-js)**: 使用原生 HTML + CSS + JavaScript 实现的版本
   - 代码更简单直观
   - 无需构建工具
   - 可以直接在浏览器中运行

原始版本的代码也可以在 `original-code-backup.md` 文件中找到。

## 如何运行

### React 版本 (main 分支)

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### 原生版本 (vanilla-js 分支)

直接在浏览器中打开 `index.html` 文件即可。

## 功能特点

- 3D 翻书动画效果
- 渐变色页面
- 答案渐显动画
- 完全响应式设计
- 支持移动端触控

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
