import { useState, useEffect } from 'react';
import './App.css';
import { FetchYouTubeTrailerUrl } from './trailer';
import SearchBar from './searchBar';
import { setViewsValueFalse, setIsnotInView, } from './dataHistory';
import { useAppDispatch, useAppSelector } from './store';
function App() {
  const [dataRows, setDataRows] = useState([
    { title: 'Top Rated Movies', subject: 'trending', type: 'all/day', data: [] },
    { title: 'Trending Movies', subject: 'trending', type: 'movie/day', data: [] },
    { title: 'Trending TV', subject: 'trending', type: 'tv/day', data: [] },
    { title: 'Upcoming Movies', subject: 'movie', type: 'upcoming', data: [] },
    { title: 'Top-rated Movies', subject: 'movie', type: 'top_rated', data: [] },
    { title: 'Popular Movies', subject: 'movie', type: 'popular', data: [] },
  ]);

  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [selectedTrailerUrl, setSelectedTrailerUrl] = useState('');

  const stackHistory = useAppSelector(state => state.dataHistory.stackhistory)
  const index = useAppSelector(state => state.dataHistory.currentIndex)
  const dispatch = useAppDispatch()
  useEffect(() => {
    console.log(window.history.state.idx, stackHistory, 'w -s:', window.history.state.idx - stackHistory -1, 'index: ', index)
    dispatch(setViewsValueFalse())
    dispatch(setIsnotInView())
    const fetchDataForAllRows = async () => {
      const apiKey = process.env.REACT_APP_MOVIE_API_KEY;

      const updatedDataRows = await Promise.all(
        dataRows.map(async (row) => {
          const url = `https://api.themoviedb.org/3/${row.subject}/${row.type}?api_key=${apiKey}`;

          try {
            const response = await fetch(url);
            const responseData = await response.json();
            return { ...row, data: responseData.results };
          } catch (error) {
            console.error(error);
            return row;
          }
        })
      );

      setDataRows(updatedDataRows);
    };
    
    fetchDataForAllRows();
    console.log(dataRows)
  }, []);


  const handleOnMouseDown = (e) => {
    setIsScrolling(true);
    setStartX(e.clientX);
    setScrollLeft(e.currentTarget.scrollLeft);
  };
  const handleOnMouseMove = (e) => {
    if (!isScrolling) return;
    const x = e.clientX - startX;
    e.currentTarget.scrollLeft = scrollLeft - x;
  };
  const handleOnMouseUp = () => {
    setIsScrolling(false);
  };


  const handleOnTouchStart = (e) => {
    setIsScrolling(true);
    setStartX(e.touches[0].clientX);
    setScrollLeft(e.currentTarget.scrollLeft);
  };
  const handleOnTouchMove = (e) => {
    if (!isScrolling) return;
    const x = e.touches[0].clientX - startX;
    e.currentTarget.scrollLeft = scrollLeft - x;
  };
  const handleOnTouchEnd = () => {
    setIsScrolling(false);
  };

  

  return (
    <>
      <SearchBar />
      <div on className="background_container">
        <div className='Streaming'>
          <div className='top-text'>On Streamify</div>
          <div className='head-text'> Explore captivating shows and series, handpicked for you.
             From drama to comedy, sci-fi to romance, we've got it all. Start Watching now!</div>
        </div>
        {dataRows.map((row, index) => (
          <div  key={index}>
            <h2 className='Titles'>{row.title}</h2>

            <div
              className="flex-container"
              onMouseDown={(e) => handleOnMouseDown(e, index)}
              onMouseMove={(e) => handleOnMouseMove(e, index)}
              onMouseUp={handleOnMouseUp}
              onMouseLeave={(handleOnMouseUp)}
              onTouchStart={(e) => handleOnTouchStart(e, index)}
              onTouchMove={(e) => handleOnTouchMove(e, index)}
              onTouchEnd={handleOnTouchEnd}
            >
              {row.data.map((item) => (
                <div className="movie_item  " key={item.id}>
                  <div className='imag ' >
                    {
                     item.poster_path  ?(
                       <img className=''
                       alt=""
                       src={`https://image.tmdb.org/t/p/w300/${item.poster_path}`}
                       />
                      ):
                      <img src= {`https://image.tmdb.org/t/p/w300/${item.profile_path}`}/>

                    }
                    <button className=''
                     onClick={() => setSelectedTrailerUrl(item)}
                     onTouchEnd={() => setSelectedTrailerUrl(item)}>Trailer</button>
                  </div>
                  <div className="movie_name">
                    {item.original_title ? item.original_title : item.original_name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {selectedTrailerUrl && <FetchYouTubeTrailerUrl item={selectedTrailerUrl} />}
    </>
)}
  export default App;