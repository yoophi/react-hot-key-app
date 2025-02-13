import { useEffect } from 'react';
import { Box } from './Box';
import { useEventStore } from '../shared/store/event';
import { useCurrentFocus } from '../shared/store/focus';
import { useCategoryProductStore } from '../shared/store/products';

export const Category = ({ category }: { category: string; }) => {
  const focusId = category.toLowerCase().replace(' ', '-');
  const setCurrentCategory = useCategoryProductStore((state) => state.setCurrentCategory);
  const { eventData, handleEvent, eventHandled } = useEventStore();
  const currentFocusId = useCurrentFocus();

  useEffect(() => {
    if (eventData && eventHandled === false && currentFocusId === focusId) {
      setCurrentCategory(category);
      handleEvent();
    }
  }, [eventData, handleEvent, category, eventHandled, currentFocusId, setCurrentCategory, focusId]);

  return (
    <Box key={category} focusId={focusId}>
      {category}
    </Box>
  );
};
