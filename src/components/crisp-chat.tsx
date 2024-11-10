"use client";
import { useEffect } from "react";
import {Crisp} from "crisp-sdk-web"

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("e5fcaea1-4d9d-4e43-ab6d-23f289383fb4")
  }, [])
  return null
}