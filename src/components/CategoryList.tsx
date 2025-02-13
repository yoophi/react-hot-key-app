import { forwardRef, useImperativeHandle } from 'react';
import { Category } from './Category';
import { useCurrentFocus } from '../shared/store/focus';
import { useCategoryProductStore } from '../shared/store/products';
import { HTMLDivElementWithFocusChildren } from '../types/HTMLDivElementWithFocusChildren';

export const CategoryList = forwardRef<HTMLDivElementWithFocusChildren, { categories: string[] }>(({ categories }, ref) => {
  const hasFocus = useCurrentFocus();
  const setCurrentCategory = useCategoryProductStore((state) => state.setCurrentCategory);

  const getFocusIds = () => {
    return categories.map((category) => category.toLowerCase().replace(' ', '-'));
  };

  useImperativeHandle<HTMLDivElementWithFocusChildren, HTMLDivElementWithFocusChildren>(ref, () => ({
    ...(document.createElement('div')),
    getFocusIds
  }));

  return (
    <div ref={ref} className={`flex ${hasFocus ? 'border-4 border-blue-500' : ''}`}>
      {categories.map((category) => (
        <button
          onClick={() => {
            setCurrentCategory(category);
          }}
        >
          <Category category={category} />
        </button>
      ))}
    </div>
  );
});

CategoryList.displayName = 'CategoryList';
