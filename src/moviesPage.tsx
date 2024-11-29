import { useEffect, useState } from "react";
import { GetActorCombinedCredits } from "./actorsSlice";
import { useAppSelector, useAppDispatch } from "./store";
import { useNavigate } from "react-router-dom";
import { updateApiData, makeEven, setIsnotInView, setViewsValueTrue } from "./dataHistory";
import SearchBar from "./searchBar";
import './imagesButtonGrow.css'


export default function MoviePages() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const dataHistory = useAppSelector((state) => state.dataHistory.data);
  const index = useAppSelector(state => state.dataHistory.currentIndex)
  const items = useAppSelector(state => state.dataHistory.renderItem)

  const isInview = useAppSelector(state => state.dataHistory.isInView)
  const viewValueBool = useAppSelector(state => state.dataHistory.viewValueBool)

  let movieCredits = useAppSelector((state) => state.movieCredits.data);
  let movieCombinedCredits = useAppSelector((state) => state.movieCombined.data);
  let showTrailer = useAppSelector((state) => state.trailer.data);
  
  const [loadingTrailer, setLoadingTrailer] = useState(true);
  const [trailerLoaded, setTrailerLoaded] = useState(false);
  
  let filterItems: any = [];
  filterItems = movieCredits?.cast.filter((item) => item.profile_path);
  const [currentMovieCast, setCurrentMovieCast] = useState(filterItems)
  const [currentMovieTrailer, setCurrentMovieTrailer] = useState(showTrailer)
  const [currentMovieCredits, setCurrentMovieCredits] = useState(movieCombinedCredits)

  useEffect(() => {
    console.log('movieCombined', movieCombinedCredits)
    if(viewValueBool === false && isInview === false){
      navigate("/")
    }
    //
    console.log('viewValueBool', viewValueBool,  "isInView", isInview)
    if(viewValueBool === false && isInview === true){
      dispatch(setIsnotInView())
      dispatch(setViewsValueTrue())
    }
    window.scrollTo(0,0)
    setCurrentMovieCredits(movieCombinedCredits)
    setCurrentMovieCast(filterItems)
    setCurrentMovieTrailer(showTrailer)

    if (showTrailer && !trailerLoaded) {
      setLoadingTrailer(false);
      setTrailerLoaded(true);
    }

    console.log('index is:', index, 'isInView: ', isInview)

    if(items=== true){
      if(dataHistory[index]){
        setCurrentMovieCast(dataHistory[index].data.movieCredits)
        setCurrentMovieCredits(dataHistory[index].data.movieCombinedCredits)
        setCurrentMovieTrailer(dataHistory[index].data.showTrailer)
      }
      console.log(dataHistory)
    }
  }, [showTrailer, index, items, movieCombinedCredits,movieCredits, isInview]);

  const handleActorPage = (id: number) => {
    if(items === true){
      dispatch(makeEven())
    }
    dispatch(updateApiData({ movieCredits: currentMovieCast, movieCombinedCredits: currentMovieCredits, showTrailer: currentMovieTrailer }));
    dispatch(GetActorCombinedCredits(id));
    navigate("/actors");
  };

  return (
    <div className="mt-10 bg-[rgb(21,21,21)] text-white">
      <SearchBar />
      <div className="flex items-center flex-col m-2 lg:flex lg:items-center lg:flex-row lg:ml-8 xl:ml-2 ">
        {currentMovieCredits && ("profile_path" in currentMovieCredits) ? (
          <img
            className="w-40 sm:w-60  lg:w-80 xl:w-96 lg:m-8 lg:mb-8 rounded-lg"
            src={`https://image.tmdb.org/t/p/w500${currentMovieCredits?.backdrop_path}`}
            alt=""
          />
        ) : (
          currentMovieCredits && (
            <img
              className="w-40 sm:w-60  lg:w-80 xl:w-96 lg:m-8 lg:mb-8 rounded-lg"
              src={`https://image.tmdb.org/t/p/w500${currentMovieCredits?.poster_path}`}
              alt=""
            />
          )
        )}
       {<div className="flex justify-center w-[96%] h-60 sm:w-full sm:h-80 m-4 lg:justify-start lg:mb-4 lg:ml-8 lg:h-[440px] xl:h-[60vh] xl:w-[50vw]  xl:ml-20">
          {loadingTrailer ? (
            <div className="">Loading trailer...</div>
          ) : (
            <iframe
              className="w-[90%] h-[250px] sm:w-[70%] sm:h-[300px]  md:w-2/3 md:h-96 lg:h-full lg:w-full xl: xl:w-full xl:h-full rounded-lg"
              src={`https://www.youtube.com/embed/${currentMovieTrailer?.items[0].id.videoId}`}
              allowFullScreen
            />
          )}
        </div>}
      </div>
      <hr className="w-full  border-[rgb(38,42,47)] mt-24 sm:mt-2 md:mt-14 lg:mt-0"/>

            <div className="md:mt-8 lg:ml-16">
            <div >
                <p className="inline text-3xl"> {currentMovieCredits?.title}:</p>
                <p className="lg:w-3/4 mt-2 lg:text-xl">{currentMovieCredits?.overview}</p>
            </div>


            <div className="mt-2 text-md mb-8">
                <p className="inline"> Budget: {currentMovieCredits?.budget} | </p>
                <p className="inline"> Revenue: {currentMovieCredits?.revenue} | </p>
                <p className="inline">  Runtime:{currentMovieCredits?.runtime} | </p>
                <p className="inline"> Status: {currentMovieCredits?.status}</p>
                <p className="mt-1"> Tagline: {currentMovieCredits?.tagline}</p>
            </div>
            </div>
            <hr className="w-full  border-[rgb(38,42,47)] mb-4"/>

            <h1 className="text-4xl ml-16">Cast:</h1>

            <div className="flex flex-wrap justify-center">
            {currentMovieCast && currentMovieCast
            .map((item:any, index:number) => (
                <div className="imog m-2 lg:m-8 flex flex-col items-center" >
                  <div className="cursor-pointer" onClick={() =>handleActorPage(item.id)}>
                    <img className="w-40 md:w-60 md:h-90 md:object-contain rounded-lg" src={`https://image.tmdb.org/t/p/w500${item.profile_path}`} alt="" />
                  </div>
                    <div className=" flex flex-col items-center text-center w-48">
                    <button className="buttons mt-2" onClick={() =>handleActorPage(item.id)} key={index+1}>see more</button>
                    <p>name: {item.name}</p>
                    <p>character: {item.character}</p>
                    <p>known for: {item.known_for_department}</p>
                    <p>popularity: {item.popularity}</p>
                    </div>
                </div>
            ))}
            </div>
        </div>
    )
}