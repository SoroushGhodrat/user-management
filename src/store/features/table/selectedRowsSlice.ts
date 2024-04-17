import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SelectedRowsState {
  selectedRows: Record<string, boolean>;
}

const initialState: SelectedRowsState = {
  selectedRows: {},
};

export const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    setSelectedRows: (
      state,
      action: PayloadAction<Record<string, boolean>>,
    ) => {
      state.selectedRows = action.payload;
    },
  },
});

export const { setSelectedRows } = tableSlice.actions;

export default tableSlice.reducer;
