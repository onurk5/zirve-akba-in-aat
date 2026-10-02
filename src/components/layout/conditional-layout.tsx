"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./navbar";
import { Footer } from "./footer";

export function ConditionalHeader() {
  const pathname = usePathname();
  
  if (pathname?.startsWith("/admin") || pathname?.startsWith("/login")) {
    return null;
  }
  
  return <Navbar />;
}

export function ConditionalFooter() {
  const pathname = usePathname();
  
  if (pathname?.startsWith("/admin") || pathname?.startsWith("/login")) {
    return null;
  }
  
  return <Footer />;
}
