import Header from "@/app/ui/header/header";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen overflow-hidden bg-stone-50 pt-[73px]">
      <Header />
      {children}
    </div>
  );
}
