"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./navbar";
import { Footer } from "./footer";

export function ConditionalHeader({ logoUrl }: { logoUrl?: string }) {
  const pathname = usePathname();
  
  if (pathname?.startsWith("/admin") || pathname?.startsWith("/login")) {
    return null;
  }
  
  return <Navbar logoUrl={logoUrl} />;
}

export function ConditionalFooter({ logoUrl }: { logoUrl?: string }) {
  const pathname = usePathname();
  
  if (pathname?.startsWith("/admin") || pathname?.startsWith("/login")) {
    return null;
  }
  
  return <Footer logoUrl={logoUrl} />;
}
