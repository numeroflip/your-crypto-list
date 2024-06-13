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

## Design decisions

We aim to be

- type safe
- lightweight on the frontend.
- Have very good performance scores, measured by https://pagespeed.web.dev/

For this reason we do everything we can on the server, to keep performance metrics high. Also we are very considerate in the libraries we use client side.

### Tech

#### Type safety

We want to be type safe in the runtime too, so we validate data where is possible/makes sense (eg.: network responses). `Zod` is the standard lib for that. Usually we define typescript types in zod first, if we know that we want to validate them. For typing component props it might not be necessary

#### Caching

Opted for a thin wrapper around fetch, that disables by default next 14's aggressive caching strategy. That means caching is opt-in, instead of opt-out (Which is the default behavior in upcoming Next 15 btw)

Also, I noticed that the Token list has a huge payload, over 2MB, and NextJs won't cache data at that size. For this reason I'm using `node-cache` to still cache this list, so we don't fetch it too often, and the server side pagination and search is quicker as a result.

### Pages

#### Overview Page

It's mostly SSR, since the pagination and the search is handled on the server, to keep the client bundle and the JS overhead minimal

##### Search

To keep the app lightweight and minimize client JS, the search feature will be handled server side. The downside is, that the server will need to do some extra work, and the results will come somewhat slower, compared if we did this in client side.

I choose `Fuse.js` for fuzzy search, as it's a popular library for this usecase

#### Pagination

Since the overall list of tokens on the overview page is extremely long, we will add server side pagination for that, to avoid performance issues. (An alternative would be virtualizing the list)

#### Token detail page

It's ISR rendered. A static page, which get's revalidated after a given time.

ISR here has a noticable con, that the very first page load is relatively slow (since the pages are not prebuilt).
To remedy that it might be worth considering to change it to dynamic rendering, where the server sends the data for each user, so we can stream a loading UI.
This would make page transitions appear faster.

Either that, or prebuild a limited selection of the most popular tokens, so they are faster initially. Currently the API won't allow that, since it sends a "Too Many Request" error when attempting to pregenerate multiple token detail pages.
