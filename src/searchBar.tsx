import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetData } from "./userSlice";
import { useAppDispatch, useAppSelector } from "./store";
import { setIsnotInView, setViewsValueFalse, updateIndex } from "./dataHistory";

export default function SearchBar() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [input, setInput] = useState('')
    const viewValueBool = useAppSelector(state => state.dataHistory.viewValueBool)
    const index = useAppSelector(state => state.dataHistory.currentIndex)
    const isInview = useAppSelector(state => state.dataHistory.isInView)
    const stackhistory = useAppSelector(state => state.dataHistory.stackhistory)

    const handleSearch = () => {
      console.log('index is: ', index, 'isiNvIEW', isInview, 'viewValueBool', viewValueBool)
      dispatch(setIsnotInView())

        if(isInview === true){
          dispatch(GetData(input))
        }
        else if(viewValueBool ===true && index > -1){
          window.history.go(-index -1)
          dispatch(setViewsValueFalse())
          dispatch(GetData(input))
          console.log('the first option wat the chosen')
        }
        else if(viewValueBool === false && index < 1){
          dispatch(GetData(input))
          navigate('/UserView')
          console.log('second option')
        }

        dispatch(updateIndex(0))
      }

      const handleDefaultPage = () =>{
        console.log('window index: ', window.history.state.idx, 'stack history index: ', stackhistory)
        dispatch(setViewsValueFalse())

        if(stackhistory-1 - window.history.state.idx === 0){
        }
        else if( window.history.state.idx - (stackhistory -1)  === 1){
          window.history.go(-index -1)
        }
        else window.history.go(-index -2)
      }

      const handleKeyPress = (event:any) => {
        if (event.key === "Enter") {
          handleSearch();
        }
      };

    return(
        <div className="flex justify-between h-14 text-white bg-[rgb(17,17,17)] fixed top-0 w-full">
        <p className="inline  font-serif text-[#11e511] mt-1 sm:m-2 ml-1 text-lg md:text-4xl md:relative top-[-7px]  lg:ml-10 cursor-pointer" onClick={handleDefaultPage}>Streamify</p>
        <div>
            <input className="bg-gray-800 border-2 border-black outline-none rounded-3xl pl-4 h-10 w-28 sm:m-1 mt-1 text-md md:w-60 lg:w-96"onKeyDown={handleKeyPress} onChange={(e) =>setInput(e.target.value)} placeholder="search for an actor movie or tv show" type="text" />
            <button className="text-white bg-gray-800 border-gray-950 md:w-14 lg:w-20 lg:h-10 sm:rounded-md md:rounded-lg w-12 h-8 text-sm hover:bg-gray-700" onClick={handleSearch}>search</button>
        </div>
         <div>
            <button className="bg-[rgb(48,179,48)] hover:bg-[rgb(75,220,75)] md:w-40 md:h-8 w-20 h-12 text-sm border-black  text-white m-1  rounded-md mr-2 sm:mr-4" onClick={() => alert(` sorry this page is still under development \n but how about searching for an actor movie or tv show on the search bar? \n what you think about searching for jim carrey?`)}>Subscribe to Streamify</button>
            <button className="rounded-md bg-black hover:bg-white hover:text-black border-gray-800 text-white m-1 md:w-20 md:h-8 sm:mr-10 w-12 h-8 mr-2 absolute right-4  top-16 sm:relative sm:top-[-7px] sm:right-0 sm:rounded-md md:top-0 md:mr-10 sm:mt-2 md:bottom-0 sm" onClick={() => alert(' sorry this page is still under development \n how about searching for an actor movie or tv show on the search bar? \n how about searching for anne hathaway')}>Log In</button>
         </div>
        </div>
    )
}