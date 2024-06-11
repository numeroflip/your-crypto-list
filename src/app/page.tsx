import Image from "next/image";

export default function Home() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center gap-8 p-24">
        <h1 className="text-3xl font-semibold">Tokens</h1>
        <div>...List of tokens...</div>
      </main>
      <footer>Footer</footer>
    </>
  );
}
