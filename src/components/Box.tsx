import React from 'react';
import { useCurrentFocus } from '../shared/store/focus';

export const Box = ({children,  focusId}: {children: React.ReactNode,  focusId?: string}) => {
  const hasFocus = useCurrentFocus() === focusId;

  return (
    <div className={`bg-red-100 p-4 m-1 w-1/4 inline-block ${hasFocus ? 'border-4 border-blue-500' : ''}`}>{children}</div>
  )
}
