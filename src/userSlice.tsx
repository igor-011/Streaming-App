import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { personApiData } from "./types";
import type { PayloadAction } from '@reduxjs/toolkit'

export type UserState = {
  data: personApiData | null,
  loading: boolean,
  error: string | null
}

const initialState: UserState = {
  data: null,
  loading: false,
  error: ''
}

export const GetData = createAsyncThunk('user/getData', async (query: string) => {
  return fetch(`https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&query=${query}`)
    .then(response => response.json())
})

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // You can add other reducers here if needed
  },
  extraReducers (builder){
    builder
    .addCase(GetData.pending, (state) => {
      state.loading = true
    })
    .addCase(GetData.fulfilled, (state, action:PayloadAction<any>) => {
      state.loading = false
      state.data = action.payload
      state.error = null
    })
    .addCase(GetData.rejected, (state, action:PayloadAction<any>) => {
      state.loading = false
      state.error = action.payload//error.message ?? ''
    })
  }
})

export default userSlice.reducer