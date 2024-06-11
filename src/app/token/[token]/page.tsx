export default function Token({ params }: { params: { token: string } }) {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center gap-8 p-24">
        <h1 className="text-3xl font-semibold">Token: {params.token}</h1>
      </main>
      <footer>Footer</footer>
    </>
  );
}
