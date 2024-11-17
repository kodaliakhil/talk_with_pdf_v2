"use client"; // Mark this file as a Client Component

import { ClerkProvider } from "@clerk/nextjs";

export default function ClerkProviderWrapper({ children }) {
  return <ClerkProvider>{children}</ClerkProvider>;
}