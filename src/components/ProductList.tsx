import { forwardRef, useImperativeHandle } from 'react';
import { Box } from './Box';
import { useCurrentFocus } from '../shared/store/focus';
import { Product } from '../shared/store/products';
import { HTMLDivElementWithFocusChildren } from '../types/HTMLDivElementWithFocusChildren';

export const ProductList = forwardRef<HTMLDivElementWithFocusChildren, { products: Product[] }>(({ products }, ref) => {
  const hasFocus = useCurrentFocus();

  const getFocusIds = () => {
    return products.map((category) => category.toLowerCase().replace(' ', '-'));
  };

  useImperativeHandle<HTMLDivElementWithFocusChildren, HTMLDivElementWithFocusChildren>(ref, () => ({
    ...(document.createElement('div')),
    getFocusIds
  }));

  return (
    <div ref={ref} className={`flex ${hasFocus ? 'border-4 border-blue-500' : ''}`}>
      {products.map((product) => (
        <Box key={product} focusId={product.toLowerCase().replace(' ', '-')}>
          {product}
        </Box>
      ))}
    </div>
  );
});
