import { create } from 'zustand';

export type Category = string 
export type Product = string
export type CategoriesProducts = Record<Category, Product[]>

type CategoryProductState = {
  categoriesProducts: CategoriesProducts;
  currentCategory?: Category;
};

type CategoryProductActions = {
  setCategoriesProducts: (categoriesProducts: CategoriesProducts) => void;
  setCurrentCategory: (category: string) => void;
};

export const useCategoryProductStore = create<CategoryProductState & CategoryProductActions>((set) => ({
  categoriesProducts: {},
  setCategoriesProducts: (categoriesProducts: CategoriesProducts) => {
    return void set({ categoriesProducts , currentCategory: Object.keys(categoriesProducts)[0] });
  },
  setCurrentCategory: (category: string) => void set({ currentCategory: category }),
}));

export const useCurrentCategoryProducts = () =>
  useCategoryProductStore((state) => {
    const currentCategory = state.currentCategory || Object.keys(state.categoriesProducts)[0];
    return currentCategory ? state.categoriesProducts[currentCategory] : [];
  });

export const useCategories = () =>
  useCategoryProductStore((state) => Object.keys(state.categoriesProducts));
