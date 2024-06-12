This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

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

### Design decisions

We aim to be type safe, and lightweight on the frontend. This means we do everything on the server-side whenever possible, to keep performance metrics high. Also we are very considerate in the libraries we use client side.

## Typescript

We aim to be type safe, and validate data structures in runtime where it is possible/makes sense (eg. network responses). Zod is the standard lib for that
