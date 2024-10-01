import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import userReducer from './userSlice'
import actorCombinedReducer from './actorsSlice'
import tvCombinedReducer from './tvSlice'
import tvSliceReducer from './tvSliceCredits'
import movieSliceReducer from './movieSliceCredits'
import movieCombinedReducer from './moviesSlice'
import showsReducer from './trailerGenerations'
import dataHistoryReducer from './dataHistory'

const store = configureStore({
  reducer: {
    user: userReducer,
    actorCredits: actorCombinedReducer,
    tvCombined: tvCombinedReducer,
    tvCredits: tvSliceReducer,
    movieCombined: movieCombinedReducer,
    movieCredits: movieSliceReducer,
    trailer: showsReducer,
    dataHistory:dataHistoryReducer
  }
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector