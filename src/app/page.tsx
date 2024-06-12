import { Suspense } from "react";
import TokenList from "./components/TokenList";

export default async function Home() {
  return (
    <>
      <main className="flex max-w-screen-xl self-center  flex-col items-center gap-8 px-2 pt-10">
        <h1 className="text-3xl font-semibold">Tokens</h1>
        <div className="flex flex-col">
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <input
            type="text"
            className="rounded-full bg-white/80 shadow-md px-4 py-2 "
            placeholder="search"
            name="search"
            id="search"
          />
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <TokenList />
        </Suspense>
      </main>
    </>
  );
}
