import type { Metadata } from "next";
import { Security } from "@/components/diwan/Security";
import { CtaBand } from "@/components/diwan/CtaBand";

export const metadata: Metadata = {
  title: "Security",
  description:
    "Your client list is the business. Two-factor authentication, password hashing, session safety and browser-safe tokens — explained in plain terms.",
};

export default function SecurityPage() {
  return (
    <>
      <Security />
      <CtaBand />
    </>
  );
}
