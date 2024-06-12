import { Suspense } from "react";
import TokenList from "./components/TokenList";
import SearchBar from "./components/SearchBar";

type Props = {
  searchParams?: {
    search?: string;
  };
};

export default async function Home({ searchParams }: Props) {
  return (
    <>
      <main className="flex max-w-screen-xl self-center  flex-col items-center gap-8 px-2  pb-20 py-10">
        <h1 className="text-3xl my-10 font-semibold">Choose a Token</h1>
        <div className="flex flex-col mb-10">
          <Suspense fallback={<div>Loading...</div>}>
            <SearchBar />
          </Suspense>
        </div>

        <Suspense fallback={<div>Loading...</div>}>
          <TokenList query={searchParams?.search} />
        </Suspense>
      </main>
    </>
  );
}
