"use client";
import { useEffect, useState } from "react";
import { ProModal } from "./proModal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }
  return <div><ProModal></ProModal></div>;
};
