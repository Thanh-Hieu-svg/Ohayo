import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { PRODUCT_URL, CATEGORY_URL } from '../api/api';

export const fetchShopData = createAsyncThunk(
  'shop/fetchData',
  async () => {
    const [productRes, categoryRes] = await Promise.all([
      axios.get(PRODUCT_URL),
      axios.get(CATEGORY_URL)
    ]);
    return {
      products: productRes.data,
      categories: categoryRes.data
    };
  }
);

const shopSlice = createSlice({
  name: 'shop',
  initialState: {
    products: [],
    categories: [],
    selectedCategories: [],
    sort: 'latest',
    loading: false
  },
  reducers: {
    setSelectedCategories: (state, action) => {
      state.selectedCategories = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchShopData.pending, state => {
        state.loading = true;
      })
      .addCase(fetchShopData.fulfilled, (state, action) => {
        state.products = action.payload.products;
        state.categories = action.payload.categories;
        state.loading = false;
      })
      .addCase(fetchShopData.rejected, state => {
        state.products = [];
        state.categories = [];
        state.loading = false;
      });
  }
});

export const { setSelectedCategories, setSort } = shopSlice.actions;
export default shopSlice.reducer;