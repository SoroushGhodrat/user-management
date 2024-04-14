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
  isDeleteUserSuccess: boolean;
}

const initialState: UsersState = {
  users: [],
  isLoading: false,
  isError: false,
  errorMessage: null,
  isSuccess: false,
  isDeleteUserSuccess: false,
};

// Async thunk for fetching users
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await new Promise<AxiosResponse<User[]>>((resolve) =>
    setTimeout(async () => {
      const result = await axios.get<User[]>(
        "http://localhost:8000/DUMMY_USERS",
      );
      resolve(result);
    }, 2000),
  );

  return response.data;
});

// Async thunk for updating user
export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (user: User) => {
    const response = await axios.put<User>(
      `http://localhost:8000/DUMMY_USERS/${user.id}`,
      user,
    );
    return response.data;
  },
);

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
    deleteUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
    setDeleteUserStatus: (state, action: PayloadAction<boolean>) => {
      state.isDeleteUserSuccess = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Fetch users
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
    // Update user
    builder
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.users = state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user,
        );
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.error.message;
      });
  },
});

export const {
  setLoading,
  setError,
  setErrorMsg,
  setSuccess,
  deleteUser,
  setDeleteUserStatus,
} = usersSlice.actions;

export default usersSlice.reducer;
