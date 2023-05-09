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
    setCategory: (state, action) => {
      state.categoryId = action.payload;
    },
    setSort(state, action) {
      state.sortSelected = action.payload;
    },
    setPage(state, action) {
      state.currentPage = action.payload;
    },
    setFilters(state, action) {
      state.currentPage = +action.payload.currentPage;
      state.categoryId = +action.payload.categoryId;
      state.sortSelected = action.payload.sort;
    },
  },
});

export const { setCategory, setSort, setPage, setFilters } = filterSlice.actions;
export default filterSlice.reducer;
