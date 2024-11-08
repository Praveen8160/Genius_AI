// lib/useApiLimitStore.ts
import axios from "axios";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface ApiLimitState {
  apiLimit: number | null;
  setApiLimit: (limit: number) => void;
  fetchApiLimit: (userId: any) => Promise<void>;
}

export const useApiLimitStore = create<ApiLimitState>()(
  devtools((set) => ({
    apiLimit: null,
    setApiLimit: (limit: number) => set({ apiLimit: limit }),
    fetchApiLimit: async (userId: any) => {
      try {
        const response = await axios.post("/api/getApiLimit/", { userId });
        set({ apiLimit: response.data.apiLimit });
      } catch (error) {
        console.error("Error fetching API limit:", error);
      }
    },
  }))
);
