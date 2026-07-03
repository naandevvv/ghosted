export default function Home() {
  return (
    <main className="flex flex-1 items-center justify-center p-6">
      <div className="w-full max-w-sm rounded-console bg-rose p-4 shadow-pop">
        <div className="flex min-h-72 flex-col items-center justify-center gap-4 rounded-bubble bg-coton p-8 text-center">
          <span aria-hidden className="animate-float text-5xl">
            💖
          </span>
          <h1 className="text-2xl font-extrabold">Opération charme</h1>
          <p className="font-medium text-encre/70">
            Console allumée, mission en préparation… ⭐
          </p>
        </div>
        <p className="pt-3 text-center text-sm font-bold text-white">
          ● lot 0 — socle
        </p>
      </div>
    </main>
  );
}
