// lib/useApiLimitStore.ts
import axios from "axios";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface ApiLimitState {
  apiLimit: number;
  setApiLimit: (limit: number) => void;
  fetchApiLimit: (userId: any) => Promise<void>;
}

export const useApiLimitStore = create<ApiLimitState>()(
  devtools((set) => ({
    apiLimit: 0,
    setApiLimit: (limit: number) => set({ apiLimit: limit + 1 }),
    fetchApiLimit: async (userId: any) => {
      try {
        const response = await axios.post("/api/getApiLimit/", { userId });
        console.log("response.data.apiLimit", response.data.apiLimit);
        set({ apiLimit: response.data.apiLimit });
      } catch (error) {
        console.error("Error fetching API limit:", error);
      }
    },
  }))
);
