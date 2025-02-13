import { create } from 'zustand';

type FocusState = {
  focusIndex: number;
  focusIds: string[];
};

type FocusActions = {
  setFocusIndex: (index: number) => void;
  setFocusIds: (ids: string[]) => void;
  next: () => void;
  prev: () => void;
};

export const useFocusStore = create<FocusState & FocusActions>((set) => ({
  focusIds: [],
  focusIndex: 0,
  setFocusIds: (ids: string[]) => void set({ focusIds: ids }),
  setFocusIndex: (index: number) => void set({ focusIndex: index }),
  next: () =>
    void set((state) => ({
      focusIndex: Math.min(state.focusIndex + 1, state.focusIds.length),
    })),
  prev: () =>
    void set((state) => ({
      focusIndex: Math.max(0, state.focusIndex - 1),
    })),
}));

export const useCurrentFocus = () => {
  return useFocusStore((state) => state.focusIds[state.focusIndex]);
};
