import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import { useLocation } from 'react-router-dom';

const Watch = () => {
  const { id } = useParams(); // Get the id from the URL
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [tv, setTv] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const movieResponse = await fetch(`http://localhost:3000/api/movies/${id}`);
        if (movieResponse.ok) {
          const movieData = await movieResponse.json();
          setMovie(movieData);
        }

        const tvResponse = await fetch(`http://localhost:3000/api/tv/${id}`);
        if (tvResponse.ok) {
          const tvData = await tvResponse.json();
          setTv(tvData);
        }
      } catch (error) {
        console.error('Error fetching media:', error);
      }
    };

    fetchMedia();
  }, [id]);

  const handleGoBack = () => {
    navigate('/home');
  };

  return (
    <div className='watch w-[100vw] h-[100vh] relative'>
      <div className='back flex items-center absolute top-[10px] left-[10px] text-white cursor-pointer z-[2]' onClick={handleGoBack}>
        <ArrowBackOutlinedIcon/>
        Home
      </div>
      {movie ? (
        <video src={`http://localhost:3000${movie.videoUrl}`} autoPlay controls className='w-[100%] h-[100%] object-cover'></video>
      ) : tv ? (
        <video src={`http://localhost:3000${tv.videoUrl}`} autoPlay controls className='w-[100%] h-[100%] object-cover'></video>
      ) : (
        <div className="text-white">Loading...</div>
      )}
    </div>
  );
};

export default Watch;
