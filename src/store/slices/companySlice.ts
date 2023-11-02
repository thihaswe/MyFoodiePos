import { companyInitialState } from "@/types/company";
import { createSlice } from "@reduxjs/toolkit";

const initialState: companyInitialState = {
  items: [],
  isloading: false,
  error: null,
};
const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    setCompany: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { setCompany } = companySlice.actions;
export default companySlice.reducer;
