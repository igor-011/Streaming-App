import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

type trailerType ={
    items: Array<{
        id:{
            videoId:string
        }
    }>
}
type stateType = {
    data: trailerType | null
    loading: boolean
    error: string
}

const initialState: stateType = {
    data: null,
    loading: false,
    error: ''
}

export const GetTrailerGenerator = createAsyncThunk('trailer/getTrailers', async (show:string) =>{
    return fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${show} trailer)&maxResults=1&type=video&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`)
    .then(response => response.json())
})

const showsTrailer = createSlice({
    name:'trailer',
    initialState,
    reducers:{
    resetTrailerData: (state) => {
    state.data = null;
}
},
    extraReducers (builder){
        builder
        .addCase(GetTrailerGenerator.pending, (state) =>{
            state.loading = true
        })
        .addCase(GetTrailerGenerator.fulfilled, (state, action:PayloadAction<any>) =>{
            state.loading = false
            state.data = action.payload
        })
        .addCase(GetTrailerGenerator.rejected, (state, action:PayloadAction<any>) =>{
            state.error = action.payload
            state.loading = false
        })
    }
})
export const {resetTrailerData} = showsTrailer.actions
export default showsTrailer.reducer