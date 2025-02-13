import { create } from 'zustand';

type EventState = {
  eventData: string | null;
  eventHandled: boolean;
};

type EventActions = {
  triggerEvent: (data: string) => void;
  handleEvent: () => void;
};
export const useEventStore = create<EventState & EventActions>((set) => ({
  eventData: null,
  eventHandled: false,
  triggerEvent: (data: string) => set({ eventData: data, eventHandled: false }),
  handleEvent: () => set({ eventHandled: true }),
}));
