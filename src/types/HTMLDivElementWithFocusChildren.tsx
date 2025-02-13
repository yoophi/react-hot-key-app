export type HTMLDivElementWithFocusChildren = HTMLDivElement & {
  getFocusIds: () => string[];
};
