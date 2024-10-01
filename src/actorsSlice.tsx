import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'

export type actorsCreditsData = {
  biography: string
  birthday:string
  homepage:string
  known_for_department: string
  name:string
  place_of_birth:string
  profile_path:string
  id:number
  combined_credits:{
    cast: Array<{
      id: number
      backdrop_path: string
      poster_path:string
      media_type:string
      title?:string
      name?:string
      overview:string
      vote_average:number
    }> | []
    crew: Array<{
      id: number
      backdrop_path: string
      poster_path:string
      department:string
      job: string
      media_type:string
      name?:string
      title?:string
      overview:string
      vote_average:number
    }> | []
  }
}

type actorState ={
    data: actorsCreditsData | null,
    loading: boolean,
    error: string | null,
}

const initialState: actorState = {
    data: null,
    loading: false,
    error: ''
  }

/*createAsyncThunk*/
export const GetActorCombinedCredits = createAsyncThunk('actors/getCredits', async (actorId: number) => {
    return fetch(`https://api.themoviedb.org/3/person/${actorId}?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&append_to_response=combined_credits`)
      .then(response => response.json())
  })
  // url with just cast and crew https://api.themoviedb.org/3/person/${actorId}/combined_credits?api_key=dd12abe88201974cc0c013f0cbb08455

  const actorCombinedSlice = createSlice({
    name: 'actorCombinedCredits',
    initialState,
    reducers: {
      // You can add other reducers here if needed
    },
    extraReducers (builder){
      builder
      .addCase(GetActorCombinedCredits.pending, (state) => {
        state.loading = true
      })
      .addCase(GetActorCombinedCredits.fulfilled, (state, action:PayloadAction<any>) => {
        state.loading = false
        state.data = action.payload
        state.error = null
      })
      .addCase(GetActorCombinedCredits.rejected, (state, action:PayloadAction<any>) => {
        state.loading = false
        state.error = action.payload//error.message ?? ''
      })
    }
  })
  
  export default actorCombinedSlice.reducer