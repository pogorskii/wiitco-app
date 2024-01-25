export function GlobalH1({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="mb-4 border-b pb-2 scroll-m-20 text-4xl font-semibold tracking-tight lg:text-5xl">
      {children}
    </h1>
  );
}
