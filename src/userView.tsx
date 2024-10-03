import{ useEffect, useState} from "react"
import { personApiData } from "./types";
import { useAppDispatch, useAppSelector } from "./store";
import { useNavigate } from "react-router-dom";
import { GetActorCombinedCredits } from "./actorsSlice";
import { GetMovieCombinedCredits } from "./moviesSlice";
import { GetMovieCredits } from "./movieSliceCredits";
import { GetTvCombinedCredits } from "./tvSlice";
import { GetTvCredits } from "./tvSliceCredits";
import { GetTrailerGenerator, resetTrailerData } from "./trailerGenerations";
import { makeEven, setViewsValueTrue, setIsInView, setIsnotInView } from "./dataHistory"
import SearchBar from "./searchBar";

export default function UserView() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const data = useAppSelector(state => state.user.data) as personApiData | null;
    const [filteredItems, setFilteredItems] = useState<any[]>([]);
    
    const handlePage = (id:number, showName:string, showId:number) =>{
      const item = data?.results[id]
      dispatch(makeEven())
      dispatch(resetTrailerData())
      dispatch(setViewsValueTrue())
      dispatch(setIsnotInView())
      if(item?.media_type === 'movie'){
        dispatch(GetMovieCombinedCredits(showId))
        dispatch(GetMovieCredits(showId))
        dispatch(GetTrailerGenerator(showName))
        navigate('/movies')
      }
      else if (item?.media_type === 'tv') {
        dispatch(GetTvCredits(showId))
        dispatch(GetTvCombinedCredits(showId))
        dispatch(GetTrailerGenerator(showName))
        navigate('/tv')
    }
      else{
        dispatch(GetActorCombinedCredits(showId))
        navigate('/actors')
    } 
    }
    
    
    useEffect(() => {
      dispatch(setIsInView())
      if (data && 'results' in data && data.results.length > 0) {
        console.log(data.results[0].name, data);
      }
      console.log(data)
      if (data?.results) {
        const filtered = data.results.filter(
          (item: any) => item.poster_path || item.profile_path
        );
        setFilteredItems(filtered);
      }
      //filterItems = actorCredits?.combined_credits.cast.filter((item) => item.poster_path || item.backdrop_path)
    }, [data]);
        return (
            <div className="bg-[rgb(24,25,24)] text-white mt-14">
              <SearchBar />

              <h1 className="text-white text-4xl ml-4 mt-16">Results: </h1>

              <div className=" flex w-full flex-wrap items-center justify-center">
             { filteredItems.length > 0 ? (filteredItems
               .map((item: any, index:any) => (
                 <div className="ml-10 mb-6 w-40  sm:mt-8  sm:w-[150px] md:w-[300px] lg:w-[400px]" /*onClick={()=> handlePage(index, item.title || item.name, item.id)} key={index+1}*/>
              {/*'overview' in item ? <p className="w-full">{item.overview}</p> : '' */}
              {('profile_path' in item) ? (
                <img className="rounded-lg w-96" src={`https://image.tmdb.org/t/p/w500${item.profile_path}`} alt="" />
              ) : (
                <img className="rounded-lg w-96" src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt="" />
              )}
              <div className="flex flex-col items-center">
                {('name' in item) ? <p>{item.name}</p> : <p>{item.title}</p>} 
                <p>{item.media_type}</p>
                <button className="bg-[rgb(36,37,36)] w-40 h-10 mt-2 sm:w-40 md:60 lg:w-80 h-12" onClick={()=> handlePage(index, item.title || item.name, item.id)} key={index+1}>see more</button>
                </div>
                </div>
              ))
             ):
             <div>

             </div>
            }
            </div>
            </div>
          );
}