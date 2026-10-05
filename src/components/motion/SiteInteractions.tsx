"use client";
import { useEffect } from "react";
import { initializeSiteInteractions } from "@/lib/motion/site";

export function SiteInteractions() {
  useEffect(() => initializeSiteInteractions(), []);
  return null;
}
