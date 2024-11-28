import { createSlice } from "@reduxjs/toolkit";
import UserView from "./userView";

const initialState = {
    data: [] as {index:number, data:any}[],
    currentIndex: 0,
    historySize: 0,
    renderItem: false,
    stackhistory: 0,
    viewsValue: 0,
    viewValueBool: false,
    isInView: false,
    SeachBarInputUserView: '',
    UserView: false
}

const dataHistory = createSlice({
    name: 'actorCredits',
    initialState,
    reducers: {
      // action to update the apiData array
      updateApiData: (state, action) => {
        state.data.push({ index: state.currentIndex, data: action.payload });
        state.currentIndex += 1;
        state.historySize = state.data.length;
        state.viewsValue += 1;
      },
      // reducer to update the currentIndex
      updateIndex:(state,action) =>{
        state.currentIndex = action.payload
      },
      makeEven: (state) =>{
        state.historySize = state.currentIndex
        state.data = state.data.slice(0,state.currentIndex)
        state.renderItem = false
      },
      renderItems: (state) =>{
        state.renderItem = true
      },
      unrenderItems:(state) =>{
        state.renderItem = false
      },
      updateHistory:(state, action) =>{
        state.historySize = action.payload
      },
      setStackHistory:(state, action) =>{
        state.stackhistory = action.payload
      },
      setViewsValueFalse:(state)=>{
        state.viewValueBool = false
      },
      setViewsValueTrue:(state)=>{
        state.viewValueBool = true
      },
      setIsInView:(state)=>{
        state.isInView = true
      },
      setIsnotInView:(state)=>{
        state.isInView = false
      },
      setSearchBarInput:(state, action)=>{
        state.SeachBarInputUserView = action.payload
      },
      updateUserView:(state)=>{
        state.UserView = true
      }
    },

  });

export const { updateApiData, renderItems, unrenderItems, updateIndex, updateHistory, makeEven, setStackHistory, setViewsValueFalse, setViewsValueTrue, setIsInView, setIsnotInView, setSearchBarInput, updateUserView} = dataHistory.actions;
export default dataHistory.reducer;