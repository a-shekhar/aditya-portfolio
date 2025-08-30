import React from "react";
import { Download } from "lucide-react";
// use alias if you have it, else: "../../components/ui/button"
import { Button } from "./button";

/**
 * Renders a "Download Resume" button that downloads / opens your PDF.
 * Adjust href to match your actual file name in /public.
 */
export default function ResumeButton({
  href = "/Aditya-Raj-Resume.pdf",
  size = "sm",
  variant = "default",
  className = "",
  label = "Download Resume",
}) {
  // If your Button supports `asChild` (shadcn), use that for a semantic <a>.
  const supportsAsChild = !!Button?.displayName; // harmless heuristic

  return supportsAsChild ? (
    <Button asChild variant={variant} size={size} className={`gap-2 ${className}`}>
      <a href={href} download target="_blank" rel="noreferrer" aria-label={label}>
        <Download className="h-4 w-4" />
        <span className="hidden sm:inline">{label}</span>
        <span className="sm:hidden">Resume</span>
      </a>
    </Button>
  ) : (
    // Fallback: anchor styled like a button if your Button lacks asChild
    <a
      href={href}
      download
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm
                  bg-white/10 hover:bg-white/15 border border-white/10
                  transition ${className}`}
    >
      <Download className="h-4 w-4" />
      <span className="hidden sm:inline">{label}</span>
      <span className="sm:hidden">Resume</span>
    </a>
  );
}
