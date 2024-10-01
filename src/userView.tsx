import{ useEffect} from "react"
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
    }, [data]);
        return (
            <div className="bg-[rgb(24,25,24)] text-white mt-14">
              <SearchBar />

              <h1 className="text-white text-4xl ml-4 mt-16">Results: </h1>
             { data ?(
             
               data && 'results' in data  &&data.results.map((item: any, index) => (
                 <div className="ml-10 cursor-pointer mb-6 w-60  sm:mt-8  sm:w-1/3" onClick={()=> handlePage(index, item.title || item.name, item.id)} key={index+1}>
              {('name' in item) ? <p>{item.name}</p> : <p>{item.title}</p>}
              {'overview' in item ? <p className="w-full">{item.overview}</p> : '' }
              {('profile_path' in item) ? (
                <img className="rounded-lg w-96" src={`https://image.tmdb.org/t/p/w500${item.profile_path}`} alt="" />
              ) : (
                <img className="rounded-lg w-96" src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt="" />
              )}
                </div>
              ))
            ):
            <div>
            <p>sorry no items were found</p>
            <p>please make sure you wrote your query right</p>
            </div>
            }
            </div>
          );
}