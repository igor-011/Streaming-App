import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./store";
import { useNavigate } from "react-router-dom";
import { GetActorCombinedCredits } from "./actorsSlice";
import { updateApiData, makeEven, setIsnotInView, setViewsValueTrue } from "./dataHistory";
import SearchBar from "./searchBar";
import './imagesButtonGrow.css'

export default function TvPage(){
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const dataHistory = useAppSelector(state => state.dataHistory.data)
    const items = useAppSelector(state => state.dataHistory.renderItem)
    const index = useAppSelector(state => state.dataHistory.currentIndex)

    const isInview = useAppSelector(state => state.dataHistory.isInView)
    const viewValueBool = useAppSelector(state => state.dataHistory.viewValueBool)

    let tvCredits = useAppSelector(state => state.tvCredits.data)
    let tvCombined = useAppSelector(state => state.tvCombined.data)
    let showTrailer = useAppSelector(state => state.trailer.data)

    const [loadingTrailer, setLoadingTrailer] = useState(true);
    const [trailerLoaded, setTrailerLoaded] = useState(false);
    
    let filterItems:any =[]
    filterItems = tvCredits?.cast.filter((item) => item.profile_path)
    
    const [currentTvCast, setCurrentTvCast] = useState(filterItems)
    const [currentTvCredits, setCurrentTvCredits] = useState(tvCombined)
    const [currentTVTrailer, setCurrentTvTrailer] = useState(showTrailer)

    useEffect(() => {
        if(viewValueBool === false && isInview === false){
            navigate("/")
          }
        if(viewValueBool === false && isInview === true){
            dispatch(setIsnotInView())
            dispatch(setViewsValueTrue())
          }
        window.scrollTo(0,0)
        if (showTrailer && !trailerLoaded) {
          setLoadingTrailer(false);
          setTrailerLoaded(true);
        }

        console.log('index: ', index, 'isinView: ', isInview)
        setCurrentTvCredits(tvCombined)
        setCurrentTvCast(filterItems)
        setCurrentTvTrailer(showTrailer)

        if(items=== true){
            if(dataHistory[index]){
                setCurrentTvCredits(dataHistory[index].data.tvCombined)
                setCurrentTvCast(dataHistory[index].data.tvCredits)
                setCurrentTvTrailer(dataHistory[index].data.showTrailer)
            }
            console.log(dataHistory)
        } 

      }, [showTrailer, index, items, tvCombined, tvCredits, isInview]);
    

    const handleActorPage = (id:number) =>{
        if(items === true ){
            dispatch(makeEven())
        }
        dispatch(updateApiData({tvCredits: currentTvCast, tvCombined:currentTvCredits, showTrailer:currentTVTrailer}))
        dispatch(GetActorCombinedCredits(id))
        navigate('/actors')
    }

    return(
        <div className="mt-10 bg-[rgb(21,21,21)] text-white">
            <SearchBar />
        <div className="flex items-center flex-col m-2 lg:flex lg:items-center lg:flex-row lg:ml-8 xl:ml-2">
            {currentTvCredits &&('profile_path' in currentTvCredits) ? (
                <img className="w-40 sm:w-60  lg:w-80 xl:w-96 lg:m-8 lg:mb-8 rounded-lg" src={`https://image.tmdb.org/t/p/w500${currentTvCredits?.backdrop_path}`} alt="" />
            ) : (
                tvCombined &&
                <img className="w-40 sm:w-60  lg:w-80 xl:w-96 lg:m-8 lg:mb-8 rounded-lg" src={`https://image.tmdb.org/t/p/w500${currentTvCredits?.poster_path}`} alt="" />
            )}
            {<div className="flex justify-center  w-[96%] h-60 sm:w-full sm:h-80 m-4 lg:justify-start lg:mb-4 lg:ml-8 lg:h-[440px] xl:h-[530px] xl:w-[55%]  xl:ml-20">
                {loadingTrailer ? (
                 <div>loading ...</div>   
                ):
                <iframe
                className="w-[90%] h-[250px] sm:w-[70%] sm:h-[300px]  md:w-2/3 md:h-96 lg:h-full lg:w-full xl: xl:w-full xl:h-full rounded-lg"
                src={`https://www.youtube.com/embed/${currentTVTrailer?.items[0].id.videoId}`}
                allowFullScreen/>
            }
            </div>}
        </div>
        <hr className="w-full  border-[rgb(38,42,47)] mt-24 sm:mt-2 md:mt-14 lg:mt-0"/>
            <div className="ml-16 mb-4 mt-2">
                <div>
                    <p className="inline text-2xl">{currentTvCredits?.name}:</p>
                </div>
                    <p className="lg:w-3/4 mt-2 lg:text-xl">{currentTvCredits?.overview}</p>
                <div>
                    <p className="inline text-lg">Status: {currentTvCredits?.status}</p>
                    <div className="">
                        <p className="inline text-lg">First Air Date: {currentTvCredits?.first_air_date} | </p>
                        <p className="inline text-lg">Last Air Date: {currentTvCredits?.last_air_date}</p>
                    </div>
                    <div className="">
                        <p className="inline text-lg">Number Of Episodes: {currentTvCredits?.number_of_episodes} | </p>
                        <p className="inline text-lg">Number Of Seasons: {currentTvCredits?.number_of_seasons} </p>
                    </div>
                </div>
            </div>
        <hr className="w-full  border-[rgb(38,42,47)] mb-4"/>
            <h1 className="text-4xl ml-16">Cast:</h1>
            <div className="flex flex-wrap justify-center">
            {currentTvCast && currentTvCast
            .map((tvCombined:any, index:number) => (
                <div className="imog m-2 lg:m-8 flex flex-col items-center text-center">
                    <div className="cursor-pointer" onClick={() =>handleActorPage(tvCombined.id)} key={index+1}>
                    <img className="w-40 md:w-60 md:h-90 md:object-contain rounded-lg" src={`https://image.tmdb.org/t/p/w500${tvCombined.profile_path}`} alt="" />
                    </div>
                    <div className="w-48">
                    <button className="buttons mt-2" onClick={() =>handleActorPage(tvCombined.id)} key={index+1}>see more</button>
                    <p>Name: {tvCombined.name}</p>
                    <p>Character: {tvCombined.character}</p>
                    <p>Known for: {tvCombined.known_for_department}</p>
                    <p>Popularity{tvCombined.popularity}</p>
                    </div>
                </div>
            ))}
            </div>
        </div>
    )
}