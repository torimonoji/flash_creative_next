"use client";

import { useEffect } from "react";
import { initializeHomeInteractions } from "@/lib/motion/home";

export function HomeInteractions() {
  useEffect(() => initializeHomeInteractions(), []);
  return null;
}
