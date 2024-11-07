import { create } from "zustand";
interface ProModalState {
  isOpen: boolean;
  OnOpen: () => void;
  OnClose: () => void;
}

export const useProModal = create<ProModalState>((set) => ({
  isOpen: false,
  OnOpen: () => set({ isOpen: true }),
  OnClose: () => set({ isOpen: false }),
}));
