import React from "react";
import { cn } from "@/lib/utils";

// Shared Premium UI Components

export const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'outline' | 'ghost' }
>(({ className, variant = 'primary', ...props }, ref) => {
  const baseStyles = "relative inline-flex items-center justify-center gap-2 px-6 py-3 font-display font-bold tracking-widest uppercase transition-all duration-300 rounded-xl overflow-hidden active:scale-95 disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-primary text-primary-foreground shadow-[0_0_20px_hsl(var(--primary)/0.3)] hover:shadow-[0_0_30px_hsl(var(--primary)/0.6)] hover:-translate-y-1",
    secondary: "bg-secondary text-secondary-foreground shadow-[0_0_20px_hsl(var(--secondary)/0.3)] hover:shadow-[0_0_30px_hsl(var(--secondary)/0.6)] hover:-translate-y-1",
    outline: "border-2 border-primary text-primary hover:bg-primary/10 shadow-[inset_0_0_15px_hsl(var(--primary)/0.1)] hover:shadow-[inset_0_0_25px_hsl(var(--primary)/0.3),0_0_15px_hsl(var(--primary)/0.3)]",
    ghost: "text-muted-foreground hover:text-foreground hover:bg-white/5",
  };

  return (
    <button ref={ref} className={cn(baseStyles, variants[variant], className)} {...props}>
      <span className="relative z-10 flex items-center gap-2">{props.children}</span>
    </button>
  );
});
Button.displayName = "Button";

export const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "glass-card rounded-2xl p-6 relative overflow-hidden group",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <div className="relative z-10">
        {props.children}
      </div>
    </div>
  )
);
Card.displayName = "Card";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        className={cn(
          "flex w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-body text-foreground placeholder:text-muted-foreground shadow-sm transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary/50 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
);
Input.displayName = "Input";

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[120px] w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-body text-foreground placeholder:text-muted-foreground shadow-sm transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary/50 disabled:cursor-not-allowed disabled:opacity-50 resize-none",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
);
Textarea.displayName = "Textarea";

export const SectionHeading = ({ children, subtitle }: { children: React.ReactNode, subtitle?: string }) => (
  <div className="mb-12 text-center">
    <h2 className="text-4xl md:text-5xl font-black mb-4 text-gradient inline-block uppercase tracking-widest">{children}</h2>
    {subtitle && <p className="text-muted-foreground text-lg font-body max-w-2xl mx-auto">{subtitle}</p>}
    <div className="h-1 w-24 bg-gradient-to-r from-primary to-secondary mx-auto mt-6 rounded-full shadow-[0_0_15px_hsl(var(--primary)/0.5)]" />
  </div>
);
