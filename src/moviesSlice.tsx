import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'


export type movieCombinedCreditsData ={
  backdrop_path: string
  budget: number
  homepage:string
  id:number
  title:string
  overview:string
  popularity:number
  poster_path:string
  release_Date:string
  revenue:number
  runtime:number
  status:string
  tagline:string
  vote_average:number
}

type movieState ={
    data: movieCombinedCreditsData | null,
    loading: boolean,
    error: string | null,
}
const initialState: movieState = {
    data: null,
    loading: false,
    error: ''
  }


export const GetMovieCombinedCredits = createAsyncThunk('Movies/getCredits', async (movieId: number) => {
    return fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&append_to_response=combined_credits`)
      .then(response => response.json())
  })

  const movieCombinedSlice = createSlice({
    name: 'MovieCombinedCredits',
    initialState,
    reducers: {
      // You can add other reducers here if needed
    },
    extraReducers (builder){
      builder
      .addCase(GetMovieCombinedCredits.pending, (state) => {
        state.loading = true
      })
      .addCase(GetMovieCombinedCredits.fulfilled, (state, action:PayloadAction<any>) => {
        state.loading = false
        state.data = action.payload
        state.error = null
      })
      .addCase(GetMovieCombinedCredits.rejected, (state, action:PayloadAction<any>) => {
        state.loading = false
        state.error = action.payload//error.message ?? ''
      })
    }
  })
  
  export default movieCombinedSlice.reducer