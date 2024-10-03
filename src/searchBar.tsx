import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetData } from "./userSlice";
import { useAppDispatch, useAppSelector } from "./store";
import { setIsnotInView, setViewsValueFalse, updateIndex } from "./dataHistory";
import Swal from "sweetalert2";
import hirasawa from './hirasawa.jpg';
import kana from './kana cabeça na mesa.jpg'
import backToSchool from './backToSchool.avif'
import backToSchoolGroup from './backToSchoolGroup.avif'
import backToSchoolDuo from './backToSchoolDuo.avif'
import lupe from './lupa.png'

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
      console.log('isInView: ',isInview)
        if(isInview === true){
          dispatch(GetData(input))
        }
        else if(viewValueBool === true && index > -1){
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
        dispatch(updateIndex(0))
      }

      const handleKeyPress = (event:any) => {
        if (event.key === "Enter") {
          handleSearch();
        }
      };

      const handleClickSubscribe =() =>{
        Swal.fire({
          title: 'sorry this Page is under Development',
          text: `how about searching for an actor, movie or tv show on the search bar? \nhow about jim carrey?`,
          imageUrl: 'https://i.pinimg.com/originals/f2/26/35/f22635607bc881102b9c56c9e9f1ffda.gif',
          imageWidth: 480,
          imageHeight: 260,
          
          imageAlt: "Custom image",
        })
      }
      const handleClickLogIn =() =>{
        Swal.fire({
          title: 'Sorry this page is under Development',
          text: `how about searching for an actor, movie or tv show on the search bar? \nhow about searching for: the hustle?`,
          imageUrl: 'https://i.pinimg.com/originals/48/1e/16/481e16af0fa33a04953eda0d08fb585e.gif',
          imageWidth: 440,
          imageHeight: 300,
          // https://i.pinimg.com/originals/eb/0f/8c/eb0f8c3e2e1a8e1508f3afa2c86ad51f.gif
          //https://steamuserimages-a.akamaihd.net/ugc/963094863873981642/CA2B847E6DD2172FB87E43C93632205A462CD5EB/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false
          imageAlt: "Custom image",
        })
      }

    return(
      <div className="flex justify-between h-14 text-white bg-[rgb(17,17,17)] fixed top-0 w-full">
        
        <p className="inline  font-serif text-[#11e511] mt-1 sm:m-2 ml-1 text-lg md:text-4xl md:relative top-[-7px]  lg:ml-10 cursor-pointer" onClick={handleDefaultPage}>Streamify</p>
        <div>
            <input className="bg-gray-800 border-2 border-black outline-none rounded-3xl pl-4 h-10 w-28 sm:m-1 mt-1 text-md md:w-60 lg:w-96"onKeyDown={handleKeyPress} onChange={(e) =>setInput(e.target.value)} placeholder="search for an actor movie or tv show" type="text" />
            <button className="text-white bg-gray-800 border-gray-950 md:w-14 lg:w-20 lg:h-10 sm:rounded-md md:rounded-lg w-12 h-8 text-sm hover:bg-gray-700" onClick={handleSearch}>search</button>
        </div>
         <div>
            <button className="bg-[rgb(48,179,48)] hover:bg-[rgb(75,220,75)] md:w-40 md:h-8 w-20 h-12 text-sm border-black  text-white m-1  rounded-md mr-2 sm:mr-4" onClick={handleClickSubscribe}>Subscribe to Streamify</button>
            <button className="rounded-md bg-black hover:bg-white hover:text-black border-gray-800 text-white m-1 md:w-20 md:h-8 sm:mr-10 w-12 h-8 mr-2 absolute right-4  top-16 sm:relative sm:top-[-7px] sm:right-0 sm:rounded-md md:top-0 md:mr-10 sm:mt-2 md:bottom-0 sm" onClick={handleClickLogIn}>Log In</button>
         </div>
        </div>
    )
}