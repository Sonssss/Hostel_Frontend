import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const loginUser = createAsyncThunk(
  "loginUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (response.ok) {
        localStorage.setItem("token", result.token);
        return result.token;
      } else {
        return rejectWithValue({ message: result.message });
      }
    } catch (error) {
      return rejectWithValue({ message: error.message });
    }
  }
);

export const registerUser = createAsyncThunk(
  "registerUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      return result;
    } catch (error) {
      return rejectWithValue({ message: error.message });
    }
  }
);

export const searchHostel = createAsyncThunk(
  "searchHostel",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:5000/api/hostel/show");
      const result = await response.json();

      return result;
    } catch (error) {
      return rejectWithValue({ message: error.message });
    }
  }
);

export const recommendedHostel = createAsyncThunk(
  "recommendedHostel",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/hostel/show?skip=0&limit=6"
      );
      const result = await response.json();
      return result.hostel;
    } catch (error) {
      return rejectWithValue({ message: error.message });
    }
  }
);

export const searchHostelOne = createAsyncThunk(
  "searchHostelOne",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/hostel/search?location=${data}`
      );
      const result = await response.json();

      return result;
    } catch (error) {
      return rejectWithValue({ message: error.message });
    }
  }
);

export const hostelRegister = createAsyncThunk(
  "hostelRegister",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/hostel/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const result = await response.json();
      console.log("post", result);
      return response.ok;
    } catch (error) {
      return rejectWithValue({ message: error.message });
    }
  }
);

export const hostelDetail = createAsyncThunk(
  "hostelDetail",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/hostel/show/${data}`
      );
      const result = await response.json();
      return result.message;
    } catch (error) {
      return rejectWithValue({ message: error.message });
    }
  }
);

const initialState = {
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
  searchItem: [],
  contentpush: false,
  hostelInfo: [],
};

const userDetailSlice = createSlice({
  name: "userDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(searchHostel.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchHostel.fulfilled, (state, action) => {
        state.loading = false;
        state.searchItem = action.payload;
      })
      .addCase(searchHostel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(searchHostelOne.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchHostelOne.fulfilled, (state, action) => {
        state.loading = false;
        state.searchItem = action.payload;
      })
      .addCase(searchHostelOne.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(hostelRegister.pending, (state) => {
        state.loading = true;
      })
      .addCase(hostelRegister.fulfilled, (state, action) => {
        state.loading = false;
        state.contentpush = action.payload;
      })
      .addCase(hostelRegister.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(hostelDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(hostelDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.hostelInfo = action.payload;
      })
      .addCase(hostelDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(recommendedHostel.pending, (state) => {
        state.loading = true;
      })
      .addCase(recommendedHostel.fulfilled, (state, action) => {
        state.loading = false;
        state.searchItem = action.payload;
      })
      .addCase(recommendedHostel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export const userDetailReducer = userDetailSlice.reducer;

export default userDetailSlice;
