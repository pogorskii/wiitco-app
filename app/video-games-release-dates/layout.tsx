import Header from "@/app/ui/header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-20">
      <Header />
      <div className="flex-grow">{children}</div>
    </div>
  );
}
