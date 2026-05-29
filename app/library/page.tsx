import { LibraryGrid } from "@/components/LibraryGrid";
import { Library } from "lucide-react";

export default function LibraryPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <header className="mb-12 flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Library className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight">My Library</h1>
          <p className="text-muted-foreground">
            A collection of games you've liked.
          </p>
        </div>
      </header>

      <LibraryGrid />
    </main>
  );
}
