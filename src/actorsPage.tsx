import{ useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./store";
import { GetMovieCombinedCredits } from "./moviesSlice";
import { GetMovieCredits } from "./movieSliceCredits";
import { GetTvCombinedCredits } from "./tvSlice";
import { GetTvCredits } from "./tvSliceCredits";
import { GetTrailerGenerator } from "./trailerGenerations";
import { updateApiData, makeEven, setIsnotInView, setViewsValueTrue } from "./dataHistory";
import { resetTrailerData } from "./trailerGenerations";
import SearchBar from "./searchBar";
import './imagesButtonGrow.css'


export default function ActorsPage() {
  
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const dataHistory = useAppSelector(state => state.dataHistory.data)
  const index = useAppSelector(state => state.dataHistory.currentIndex)
  const items = useAppSelector(state => state.dataHistory.renderItem)
  let actorCredits = useAppSelector(state => state.actorCredits.data)
  
  const isInview = useAppSelector(state => state.dataHistory.isInView)
  const viewValueBool = useAppSelector(state => state.dataHistory.viewValueBool)

  const handleMoviePageChange = (movieId: number) =>{
    dispatch(GetMovieCombinedCredits(movieId))
    dispatch(GetMovieCredits(movieId))
    navigate('/movies')
  }
  
  const handleTvPageChange = (movieId: number) =>{
    dispatch(GetTvCombinedCredits(movieId))
    dispatch(GetTvCredits(movieId))
    navigate('/tv')
  }
  
  const handlePageMedia =(id: number, show:string) =>{
    dispatch(resetTrailerData())
    dispatch(GetTrailerGenerator(show))
    dispatch(updateApiData({actorCredits: currentActorCredits, filterItems: currentCast}))
    
    if(items === true ){
      dispatch(makeEven())
    }

   if(currentCast[id].media_type === 'movie'){
      handleMoviePageChange(currentCast[id].id)
    }
    else if((currentCast[id].media_type === 'tv')){
      handleTvPageChange(currentCast[id].id)
    }
  }
  
  let filterItems:any = []
  filterItems = actorCredits?.combined_credits.cast.filter((item) => item.poster_path || item.backdrop_path)
  const [currentCast , setCurrentCast] = useState(filterItems)
  const [currentActorCredits, setCurrentActorsCredits] = useState(actorCredits)
  const history = window.history

  useEffect(() =>{
    if(viewValueBool === false && isInview === true){
      dispatch(setIsnotInView())
      dispatch(setViewsValueTrue())
    }
    window.scrollTo(0,0)
    console.log('index is: ',index, 'dataHistory is: ', dataHistory, 'isinview: ', isInview)
    setCurrentCast(filterItems)
    setCurrentActorsCredits(actorCredits)

    if(items === true){
      console.log(index)
      if(dataHistory[index]){
        setCurrentActorsCredits(dataHistory[index].data.actorCredits)
        setCurrentCast(dataHistory[index].data.filterItems)
      }
      console.log(dataHistory)
    } 

  }, [actorCredits, index, items, isInview])
  return(
    <div className="mt-10 bg-[rgb(21,21,21)] text-white">
      <SearchBar />
        
          <div className="flex flex-col items-center lg:flex-row">
            <img className="w-40 flex rounded-lg sm:w-60 md:w-80 lg:w-96 m-8 " src={`https://image.tmdb.org/t/p/w500${currentActorCredits?.profile_path}`} alt="" />
            <div className="flex flex-col items-center lg:items-start">
              <p className="text-md md:text-lg m-2 ">Artist's Name: {currentActorCredits?.name}</p>
              <p className="text-md md:text-lg m-2">Artist's Biography:</p>
              <p className="text-md p-1 m-2 text-center sm:text-md md:text-md md:text-start lg:w-3/4 lg:text-md">{currentActorCredits?.biography}</p>
            </div>
          </div>
        <hr className="w-full  border-[rgb(38,42,47)] md:mt-14 lg:mt-0"/>

        <h1 className="sm:text-start m-2 text-4xl">Cast:</h1>

      <div className="flex flex-wrap w-full justify-center">
        {currentCast && currentCast
        .map((item: any, index:number) =>(
           
          <div /*onClick={() => handlePageMedia(index, item.title || item.name )} key={index+1}*/ className="imog flex items-center flex-col m-1 sm:m-2 md:m-4 lg:m-6"> 
          {
            item?.poster_path ? (
              <img className="w-40 sm:w-48 md:w-60 lg:w-64 object-contain rounded-lg" src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} />
            ) : item?.backdrop_path ? (
              <img className="w-40 sm:w-48 md:w-60 lg:w-64 object-contain rounded-lg" src={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`} />
            ) : (
              <p>sorry no show photo</p>
            )
          }
          <div className="flex  flex-col items-center text-center text-sm md:text-md w-48 m-2">
          <button className="buttons " onClick={() => handlePageMedia(index, item.title || item.name )} key={index+1}>see more</button>
          {('title' in item) ? <p>{item.title}</p> : <p>{item.name}</p>}
          <p>{item.media_type}</p>
          <p>{item.vote_average}</p>
          </div>
          </div>
      ))}
    </div>

    </div>
    
  )
}