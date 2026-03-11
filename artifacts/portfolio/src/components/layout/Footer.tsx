import { Terminal } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 py-8 bg-black/50 backdrop-blur-lg mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Terminal className="w-4 h-4 text-primary" />
          <span className="font-display tracking-widest text-sm uppercase">SINDE.AI v1.0</span>
        </div>
        
        <p className="text-sm text-muted-foreground font-body text-center">
          © {new Date().getFullYear()} Sinde Saikiran. Designed & Engineered in the void.
        </p>
      </div>
    </footer>
  );
}
