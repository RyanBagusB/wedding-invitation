import Header from "../Header";

export default async function Layout({ children }) {
  return (
    <div className="relative min-h-screen flex flex-col bg-violet-50 dark:bg-neutral-950 transition-colors duration-300">
      <Header />

      <main className="flex-1 flex items-center justify-center p-6">
        {children}
      </main>
    </div>
  );
}
