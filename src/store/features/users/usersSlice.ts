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
      const result = await axios.get<User[]>("http://localhost:8000/DUMMY_USERS");
      resolve(result);
    }, 2000)
  );

  return response.data;
});

// Async thunk for updating user
export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (user: User, { rejectWithValue }) => {
    try {
      const response = await axios.put<User>(`http://localhost:8000/DUMMY_USERS/${user.id}`, user);
      return response.data;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (!err.response) {
          throw err;
        }
        return rejectWithValue(err.response.data);
      } else {
        throw err;
      }
    }
  }
);

// Async thunk for deleting user
export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`http://localhost:8000/DUMMY_USERS/${userId}`);
      
      // Check if the delete operation was successful
      if (response.status !== 200) {
        return rejectWithValue('Failed to delete user');
      }

      return userId;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (!err.response) {
          throw err;
        }
        return rejectWithValue(err.response.data);
      } else {
        throw err;
      }
    }
  }
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
          user.id === action.payload.id ? action.payload : user
        );
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.error.message;
      });
    // Delete user
    builder
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
        state.isLoading = false;
        state.isDeleteUserSuccess = true;
      })
      .addCase(deleteUser.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { setLoading, setError, setErrorMsg, setSuccess, setDeleteUserStatus } =
  usersSlice.actions;

export default usersSlice.reducer;
