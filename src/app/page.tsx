import { Suspense } from "react";
import TokenList, { TokenListSkeleton } from "./components/TokenList";
import SearchBar, { UncontrolledSearchBar } from "./components/SearchBar";
import { TOKEN_ITEMS_PER_PAGE } from "@/lib/services/lifiApi/tokens";
import { Metadata } from "next";

type Props = {
  searchParams?: {
    search?: string;
    page?: string;
  };
};

export const metadata: Metadata = {
  title: "Token List",
  description: "Browse crypto tokens and learn more about them",
};

export default async function Home({ searchParams }: Props) {
  return (
    <div className="flex w-full max-w-screen-xl self-center  flex-col items-center gap-8 px-2  pb-20 py-10">
      <h1 className="text-3xl  font-semibold">Choose a Token</h1>
      <div className="flex flex-col my-10">
        <Suspense fallback={<UncontrolledSearchBar />}>
          <SearchBar />
        </Suspense>
      </div>
      <div className="h-[4px] rounded-md shadow-md bg-white w-full" />

      <Suspense
        key={`${searchParams?.page}-${searchParams?.search}`}
        fallback={<TokenListSkeleton itemCount={TOKEN_ITEMS_PER_PAGE} />}
      >
        <TokenList
          page={Number(searchParams?.page)}
          query={searchParams?.search}
        />
      </Suspense>
    </div>
  );
}
