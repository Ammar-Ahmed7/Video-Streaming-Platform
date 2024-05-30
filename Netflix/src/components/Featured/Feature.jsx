import React, { useState, useEffect } from 'react';
import { PlayArrow } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

const Feature = ({ type }) => {
  const [movies, setMovies] = useState([]);
  const [randomMovie, setRandomMovie] = useState(null);
  const [imgSrc, setImgSrc] = useState("./images/Stranger Things lap.jpg");
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 640) {
        setImgSrc("./images/Stranger Things mob.jpg");
      } else {
        setImgSrc("./images/Stranger Things lap.jpg");
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000); // Adjust the delay time as needed

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/movies');
        const data = await response.json();
        setMovies(data);

        if (data.length > 0) {
          const randomIndex = Math.floor(Math.random() * data.length);
          setRandomMovie(data[randomIndex]);
        }
        setIsLoaded(true);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    return () => {};
  }, []);

  return (
    <>
      <div className='relative'>
        {type && (
          <div className='Catagory absolute top-16 left-6 space-x-3'>
            <span className='text-white font-extrabold'>{type === "movie" ? "Movie" : "Series"}</span>
            <select className='bg-black text-white cursor-pointer border-2 ' name="genre" id="genre">
              <option>Genre</option>
              <option value="adventure">Adventure</option>
              <option value="comedy">Comedy</option>
              <option value="crime">Crime</option>
              <option value="fantasy">Fantasy</option>
              <option value="historical">Historical</option>
              <option value="horror">Horror</option>
              <option value="romance">Romance</option>
              <option value="sci-fi">Sci-Fi</option>
              <option value="thriller">Thriller</option>
              <option value="western">Western</option>
              <option value="animation">Animation</option>
              <option value="drama">Drama</option>
              <option value="documentary">Documentary</option>
            </select>
          </div>
        )}

        {randomMovie && (
          <div key={randomMovie._id} className='w-[vw] overflow-hidden'>
            <video
              className="w-[100%] w-screen aspect-video"
              src={`http://localhost:3000${randomMovie.videoUrl}`}
              title="Feature video"
              frameBorder="0"
              allowFullScreen
              autoPlay
              loop={true}
              muted
            ></video>

            <CSSTransition
              in={isLoaded}
              timeout={1000} // Animation duration
              classNames='fade'
              unmountOnExit
            >
              <div className='info absolute bottom-[80px] left-10 w-[190px] flex-col space-y-3 sm:w-[500px] sm:bottom-[30px] lg:w-[700px] lg:bottom-[200px]'>
                <span className='title text-white font-bold text-[100px]'>
                  {randomMovie.title}
                </span>
                <br />
                <span className='title text-white font-normal text-[50px]'>
                  {randomMovie.description}
                </span>
                <div className='buttons space-x-3'>
                  <button className='bg-white px-2 py-2 rounded-xl border-2 border-black hover:bg-slate-400' onClick={() => navigate(`/watch/${randomMovie._id}`)}><PlayArrow />Play</button>
                </div>
              </div>
            </CSSTransition>
          </div>
        )}
      </div>
    </>
  );
}

export default Feature;
