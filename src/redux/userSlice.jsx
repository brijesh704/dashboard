import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  userData: [],
  status: null,
  bookMarkData: JSON.parse(localStorage.getItem("bookmarks")) || [],
};

export const fetchAllUser = createAsyncThunk("user/fetchAllUser", async () => {
  try {
    const response = await axios.get("https://api.github.com/users");
    return response.data;
  } catch (error) {
    if (!error.response) {
      throw error;
    }
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    toggleBookmark: (state, action) => {
      const userId = action.payload;
      const index = state.bookMarkData.indexOf(userId);
      if (index === -1) {
        state.bookMarkData.push(userId);
      } else {
        state.bookMarkData.splice(index, 1);
      }
      localStorage.setItem("bookmarks", JSON.stringify(state.bookMarkData));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userData = action.payload;
      })
      .addCase(fetchAllUser.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { toggleBookmark } = userSlice.actions;

export default userSlice.reducer;
