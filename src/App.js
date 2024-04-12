import React, { useState, useEffect } from 'react';
import './App.css';
import { FetchYouTubeTrailerUrl } from './trailer';

function App() {
  const [dataRows, setDataRows] = useState([
    { title: 'Top Rated Movies', subject: 'trending', type: 'all/day', data: [] },
    { title: 'Trending Movies', subject: 'trending', type: 'movie/day', data: [] },
    { title: 'Trending TV', subject: 'trending', type: 'tv/day', data: [] },
    { title: 'Upcoming Movies', subject: 'movie', type: 'upcoming', data: [] },
    { title: 'Top-rated Movies', subject: 'movie', type: 'top_rated', data: [] },
    { title: 'Popular Movies', subject: 'movie', type: 'popular', data: [] },
    // Add more data rows as needed
  ]);
  const [showButton, setShowButton] = useState(false);

  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [selectedTrailerUrl, setSelectedTrailerUrl] = useState('');

  useEffect(() => {
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
  }, [dataRows]);


  const handleOnMouseDown = (e, index) => {
    setIsScrolling(true);
    setStartX(e.clientX);
    setScrollLeft(e.currentTarget.scrollLeft);
  };
  const handleOnMouseMove = (e, index) => {
    if (!isScrolling) return;
    const x = e.clientX - startX;
    e.currentTarget.scrollLeft = scrollLeft - x;
  };
  const handleOnMouseUp = () => {
    setIsScrolling(false);
  };


  const handleOnTouchStart = (e, index) => {
    setIsScrolling(true);
    setStartX(e.touches[0].clientX);
    setScrollLeft(e.currentTarget.scrollLeft);
  };
  const handleOnTouchMove = (e, index) => {
    if (!isScrolling) return;
    const x = e.touches[0].clientX - startX;
    e.currentTarget.scrollLeft = scrollLeft - x;
  };
  const handleOnTouchEnd = () => {
    setIsScrolling(false);
  };

  

  return (
    <>
      <div className="background_container">
        <div className='Streaming'>
          <div className='Streamify'>Streamify</div>
          <div className='top-text'>On Streamify</div>
          <div className='head-text'> Explore captivating shows and series, handpicked for you.
             From drama to comedy, sci-fi to romance, we've got it all. Start Watching now!</div>
          <button className='Subs'>Subscribe to Streamify</button>
          <button className='Log-in'>Log in</button>
        </div>
        {dataRows.map((row, index) => (
          <div key={index}>
            <h2 className='Titles'>{row.title}</h2>

            <div
              className="flex-container"
              onMouseDown={(e) => handleOnMouseDown(e, index)}
              onMouseMove={(e) => handleOnMouseMove(e, index)}
              onMouseUp={handleOnMouseUp}
              onTouchStart={(e) => handleOnTouchStart(e, index)}
              onTouchMove={(e) => handleOnTouchMove(e, index)}
              onTouchEnd={handleOnTouchEnd}

            >
              {row.data.map((item) => (
                <div className="movie_item" key={item.id}>
                  <div className='imag' >
                    <img
                      alt=""
                      src={`https://image.tmdb.org/t/p/w300/${item.poster_path}`}
                    />

                    <button className={`${showButton ? 'buttonTouch' : ''}`}
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