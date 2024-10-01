import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'

export type tvCreditsData = {
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

type tvState ={
    data: tvCreditsData | null,
    loading: boolean,
    error: string | null,
}

const initialState: tvState = {
    data: null,
    loading: false,
    error: ''
  }


export const GetTvCredits = createAsyncThunk('tv/getCredit', async (tvId: number) => {
    return fetch(`https://api.themoviedb.org/3/tv/${tvId}/credits?api_key=${process.env.REACT_APP_MOVIE_API_KEY}`)
      .then(response => response.json())
  })

  const tvSliceCredits = createSlice({
    name: 'TvCredits',
    initialState,
    reducers: {
      // You can add other reducers here if needed
    },
    extraReducers (builder){
      builder
      .addCase(GetTvCredits.pending, (state) => {
        state.loading = true
      })
      .addCase(GetTvCredits.fulfilled, (state, action:PayloadAction<any>) => {
        state.loading = false
        state.data = action.payload
        state.error = null
      })
      .addCase(GetTvCredits.rejected, (state, action:PayloadAction<any>) => {
        state.loading = false
        state.error = action.payload//error.message ?? ''
      })
    }
  })
  
  export default tvSliceCredits.reducer