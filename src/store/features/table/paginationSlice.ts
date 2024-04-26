import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface PaginationState {
  currentPage: number
  totalPages: number
  rowsPerPage: number
}

const initialState: PaginationState = {
  currentPage: 1,
  totalPages: 1,
  rowsPerPage: 10,
}

const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    setTotalPages: (state, action: PayloadAction<number>) => {
      state.totalPages = action.payload
    },
    setRowsPerPage: (state, action: PayloadAction<number>) => {
      state.rowsPerPage = action.payload
    },
  },
})

export const { setCurrentPage, setTotalPages, setRowsPerPage } = paginationSlice.actions

export default paginationSlice.reducer
