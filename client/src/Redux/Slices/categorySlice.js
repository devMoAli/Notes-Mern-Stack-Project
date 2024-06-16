import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    loading: false,
    isCategoryCreated: false,
    category: null,
    selectedCategory: null,
  },
  reducers: {
    setCategories(state, action) {
      state.categories = action.payload;
    },
    setLoading(state) {
      state.loading = true;
    },
    clearLoading(state) {
      state.loading = false;
    },
    setIsCategoryCreated(state) {
      state.isCategoryCreated = true;
      state.loading = false;
    },
    clearIsCategoryCreated(state) {
      state.isCategoryCreated = false;
    },
    setCategory(state, action) {
      state.category = action.payload;
    },
    deleteCategory(state, action) {
      state.categories = state.categories.filter(
        (c) => c._id !== action.payload
      );
    },
    setSelectedCategory(state, action) {
      state.selectedCategory = action.payload;
    },
  },
});

const categoryReducer = categorySlice.reducer;
const categoryActions = categorySlice.actions;

export { categoryActions, categoryReducer };
