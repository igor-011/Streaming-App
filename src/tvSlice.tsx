import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'

type tvCombinedCreditsData ={

  name:string
  backdrop_path:string
  poster_path:string
  first_air_date:string
  id:number
  last_air_date:string
  number_of_episodes:number
  number_of_seasons:number
  overview:string
  popularity:number
  status:string
  tagline:string
  type:string
  vote_average:number
  last_episode_to_air:{
    air_date:string
    episode_type:string
    id:number
    name:string
    overview:string
    show_id:number
    still_path:string
    vote_average:number
  }
  seasons: Array<{
    air_date:string
    episode_count:number
    id:number
    name:string
    overview:string
    poster_path:string
    vote_average:number
    season_number:number
  }>
}

type tvState ={
    data: tvCombinedCreditsData | null,
    loading: boolean,
    error: string | null,
}

const initialState: tvState = {
    data: null,
    loading: false,
    error: ''
  }


export const GetTvCombinedCredits = createAsyncThunk('tvs/getCredits', async (tvId: number) => {
    return fetch(`https://api.themoviedb.org/3/tv/${tvId}?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&append_to_response=combined_credits`)
      .then(response => response.json())
  })

  const tvCombinedSlice = createSlice({
    name: 'TvCombinedCredits',
    initialState,
    reducers: {
      // You can add other reducers here if needed
    },
    extraReducers (builder){
      builder
      .addCase(GetTvCombinedCredits.pending, (state) => {
        state.loading = true
      })
      .addCase(GetTvCombinedCredits.fulfilled, (state, action:PayloadAction<any>) => {
        state.loading = false
        state.data = action.payload
        state.error = null
      })
      .addCase(GetTvCombinedCredits.rejected, (state, action:PayloadAction<any>) => {
        state.loading = false
        state.error = action.payload//error.message ?? ''
      })
    }
  })
  
  export default tvCombinedSlice.reducer