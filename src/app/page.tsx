import { Suspense } from "react";
import TokenList from "./components/TokenList";
import SearchBar from "./components/SearchBar";

type Props = {
  searchParams?: {
    search?: string;
    page?: string;
  };
};

export default async function Home({ searchParams }: Props) {
  return (
    <>
      <main className="flex max-w-screen-xl self-center  flex-col items-center gap-8 px-2  pb-20 py-10">
        <h1 className="text-3xl  font-semibold">Choose a Token</h1>
        <div className="flex flex-col my-10">
          <Suspense fallback={<div>Loading...</div>}>
            <SearchBar />
          </Suspense>
        </div>

        <Suspense fallback={<div>Loading...</div>}>
          <TokenList
            page={Number(searchParams?.page)}
            query={searchParams?.search}
          />
        </Suspense>
      </main>
    </>
  );
}
