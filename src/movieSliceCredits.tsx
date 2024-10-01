import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'

export type movieCreditsData = {
  cast: Array<{
    character: string
    id:number
    known_for_department:string
    name:string
    popularity:number
    profile_path:string
  }>
  crew: Array<{
    department:string
    id:number
    job:string
    know_for_department:string
    name:string
    popularity:number
    profile_path:string
  }>
}

type movieState ={
    data: movieCreditsData | null,
    loading: boolean,
    error: string | null,
}
const initialState: movieState = {
    data: null,
    loading: false,
    error: ''
  }


export const GetMovieCredits = createAsyncThunk('Movie/getCredit', async (movieId: number) => {
    return fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${process.env.REACT_APP_MOVIE_API_KEY}`)
      .then(response => response.json())
  })

  const movieSliceCredits = createSlice({
    name: 'MovieCredits',
    initialState,
    reducers: {
      // You can add other reducers here if needed
    },
    extraReducers (builder){
      builder
      .addCase(GetMovieCredits.pending, (state) => {
        state.loading = true
      })
      .addCase(GetMovieCredits.fulfilled, (state, action:PayloadAction<any>) => {
        state.loading = false
        state.data = action.payload
        state.error = null
      })
      .addCase(GetMovieCredits.rejected, (state, action:PayloadAction<any>) => {
        state.loading = false
        state.error = action.payload//error.message ?? ''
      })
    }
  })
  
  export default movieSliceCredits.reducer