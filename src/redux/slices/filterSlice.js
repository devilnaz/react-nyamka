import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryId: 0,
  currentPage: 1,
  sortSelected: { name: "популярности", property: "rating", order: "desc" },
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategory(state, action) {
      state.categoryId = action.payload;
    },
    setSort(state, action) {
      state.sortSelected = action.payload;
    },
    setPage(state, action) {
      state.currentPage = action.payload;
    },
  },
});

export const { setCategory, setSort, setPage } = filterSlice.actions;
export default filterSlice.reducer;
