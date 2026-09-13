import { create } from 'zustand';

interface MobileSheetState {
  isMobileSheetOpen: boolean;
  setIsMobileSheetOpen: (open: boolean) => void;
}

export const useMobileSheetStore = create<MobileSheetState>((set) => ({
  isMobileSheetOpen: false,
  setIsMobileSheetOpen: (open: boolean) => set({ isMobileSheetOpen: open }),
}));