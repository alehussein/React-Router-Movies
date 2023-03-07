import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import MovieList from './Movies/MovieList';
import SavedList from './Movies/SavedList';
import Movie from './Movies/Movie';

export default function App () {
  const [saved, setSaved] = useState([]); // Stretch: the ids of "saved" movies
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = () => {
      axios
        .get('http://localhost:5001/api/movies') // Study this endpoint with Postman
        .then(response => {
          setMovies(response.data);
          console.log(response.data);
          // Study this response with a breakpoint or log statements
          // and set the response data as the 'movies' slice of state
        })
        .catch(error => {
          console.error('Server Error', error);
        });
    }
    getMovies();
  }, []);

  const addToSavedList = id => {
    if (!saved.includes(id)) {
      setSaved([...saved, id]);
    } else {
      console.log('Saved')
    }
    
  };
  const handleMovieSave = (id, title) => {
    addToSavedList(id);
    console.log(`${title} has been saved.`);
  };

  return (
    <div>
      {/* never */}
      <SavedList list={[]} />

      <Routes>
        <Route path='/' element={<MovieList movies={movies} />} />
        <Route path='movies/:id' element={<Movie handleSave={handleMovieSave} saved={saved}/>} />
      </Routes>
    </div>
  );
}
