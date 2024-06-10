import React from 'react';

export function FetchYouTubeTrailerUrl({ item }) {

  const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;
  React.useEffect(() => {
    async function fetchTrailerUrl() {
      const searchQuery = `${item.original_title ? item.original_title : item.original_name} trailer`;
      console.log(item)
      console.log(item.original_name)
      const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
        searchQuery
      )}&maxResults=1&type=video&key=${apiKey}`;
      /*console.log(url)*/

      try {
        const response = await fetch(url);
        const data = await response.json();

        const trailer = data.items[0];


        if (trailer) {
          const videoId = trailer.id.videoId;
         /* console.log(trailer)*/
          const trailerUrl = `https://www.youtube.com/watch?v=${videoId}`;
          console.log(data.items[0].id)
          window.open(trailerUrl, '_blank');
        } else {
          console.log(`No ${item.original_title ? item.original_title : item.original_name} trailer found.`);
        }
      } catch (error) {
        console.error('Error fetching trailer:', error);
      }
    }

    fetchTrailerUrl();
  }, [item]);

  return null;
}