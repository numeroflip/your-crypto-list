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

#### Type safety

We want to be type safe in the runtime too, so we validate data where is possible/makes sense (eg.: network responses). `Zod` is the standard lib for that. Usually we define typescript types in zod first, when we want to validate them. In typing props for example zod might not be necessary

#### Search

To keep the app lightweight and minimize client JS, the search feature will be handled server side. The downside is, that the server will need to do some extra work, and the results will come somewhat slower, compared if we did this in client side.

#### Pagination

Since the overall list of tokens on the overview page is extremely long, we will add server side pagination for that, to avoid performance issues. (An alternative would be virtualizing the list)
