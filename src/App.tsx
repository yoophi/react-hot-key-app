// eslint-disable-next-line no-unsafe-optional-chaining
// eslint-disable-next-line @typescript-eslint/no-explicit-any
import { useEffect, useRef } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { CategoryList } from './components/CategoryList';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { MyAwesomeComponent } from './components/MyAwesomeComponent';
import { ProductList } from './components/ProductList';
import { useFocusStore } from './shared/store/focus';
import { useCategoryProductStore, useCurrentCategoryProducts } from './shared/store/products';
import { useEventStore } from './shared/store/event';
import { defaultCategoriesProducts } from './shared/data/categoryProducts';

function App() {
  const { setFocusIds, focusIds, next, prev } = useFocusStore();
  const state = useCategoryProductStore();
  const products = useCurrentCategoryProducts();
  const { triggerEvent } = useEventStore();

  useHotkeys('left', () => prev());
  useHotkeys('right', () => next());
  useHotkeys('enter', () => {
    console.log('enter key pressed');
    return triggerEvent('event fired!');
  });

  const categoryListRef = useRef<any>(null);
  const productListRef = useRef<any>(null);

  if (JSON.stringify(state.categoriesProducts) !== JSON.stringify(defaultCategoriesProducts)) {
    state.setCategoriesProducts(defaultCategoriesProducts);
  }

  useEffect(() => {
    if (!categoryListRef.current) {
      return;
    }

    const currentFocusIds = [
      'header',
      ...(categoryListRef.current?.getFocusIds() || []),
      ...(productListRef.current?.getFocusIds() || []),
      'footer',
    ];
    if (JSON.stringify(currentFocusIds) !== JSON.stringify(focusIds)) {
      setFocusIds(currentFocusIds);
    }
  }, [focusIds, setFocusIds, state.currentCategory]);

  return (
    <div>
      <div className="flex">
        <Header focusId="header" />
      </div>
      <div>
        <MyAwesomeComponent />
      </div>
      <div>
        <CategoryList ref={categoryListRef} categories={Object.keys(state.categoriesProducts) || []} />
      </div>
      <div>
        <ProductList ref={productListRef} products={products} />
      </div>
      <Footer focusId="footer" />
    </div>
  );
}

export default App;
