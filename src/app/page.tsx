import { Suspense } from "react";
import TokenList, { TokenListSkeleton } from "./components/Tokens/TokenList";
import SearchBar, { SearchBarUI } from "./components/SearchBar";
import { Metadata } from "next";
import FavoriteTokenList from "./components/Tokens/FavoriteTokenList";
import { TOKEN_ITEMS_PER_PAGE } from "@/lib/services/lifiApi/model";

export const metadata: Metadata = {
  title: "Token List",
  description: "Browse crypto tokens and learn more about them",
};

type Props = {
  searchParams: {
    query?: string;
    page?: string;
  };
};

export default async function Home({ searchParams }: Props) {
  return (
    <div className="flex w-full max-w-screen-xl self-center  flex-col items-center px-2  pb-20 py-10">
      <h1 className="text-3xl  font-semibold">Choose a Token</h1>
      <div className="flex flex-col my-10  mb-14">
        <Suspense fallback={<SearchBarUI />}>
          <SearchBar />
        </Suspense>
      </div>
      <Suspense fallback={null}>
        <FavoriteTokenList />
      </Suspense>

      <Suspense
        key={`${searchParams.query}-${searchParams.page}`}
        fallback={<TokenListSkeleton itemCount={TOKEN_ITEMS_PER_PAGE} />}
      >
        <TokenList
          query={searchParams?.query}
          page={
            isNaN(Number(searchParams?.page)) ? 1 : Number(searchParams?.page)
          }
        />
      </Suspense>
    </div>
  );
}
