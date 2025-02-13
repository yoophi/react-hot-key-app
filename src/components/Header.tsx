import { useCurrentFocus } from '../shared/store/focus';

export const Header = ({ focusId }: { focusId: string }) => {
  const hasFocus = useCurrentFocus() === focusId;

  return <div className={`bg-red-100 p-4 m-1 w-full ${hasFocus ? 'border-4 border-blue-500' : ''}`}>Header</div>;
};
