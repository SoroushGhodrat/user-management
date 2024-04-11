import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "../../../models/user";
import { AxiosResponse } from "axios";
interface UsersState {
  users: User[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string | null | undefined;
  isSuccess: boolean;
}

const initialState: UsersState = {
  users: [],
  isLoading: false,
  isError: false,
  errorMessage: null,
  isSuccess: false,
};

// Async thunk for fetching users

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await new Promise<AxiosResponse<User[]>>((resolve) =>
    setTimeout(async () => {
      const result = await axios.get<User[]>("http://localhost:8000/DUMMY_USERS");
      resolve(result);
    }, 2000)
  );

  return response.data;
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<boolean>) => {
      state.isError = action.payload;
    },
    setErrorMsg: (state, action: PayloadAction<string | null>) => {
      state.errorMessage = action.payload;
    },
    setSuccess: (state, action: PayloadAction<boolean>) => {
      state.isSuccess = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.error.message;
      });
  },
});

export const { setLoading, setError, setErrorMsg, setSuccess } = usersSlice.actions;

export default usersSlice.reducer;
