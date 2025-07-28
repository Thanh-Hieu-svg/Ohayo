import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  keyword: "",
  type: "product",
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setKeyword: (state, action) => {
      state.keyword = action.payload;
    },
    setType: (state, action) => {
      state.type = action.payload;
    },
    clearSearch: (state) => {
      state.keyword = "";
      state.type = "product";
    },
  },
});

export const { setKeyword, setType, clearSearch } = searchSlice.actions;
export default searchSlice.reducer; 