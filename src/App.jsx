import { useState } from "react";
import "./App.css";
import moviesData from "./assets/movies.json";
import { MovieCards } from "./components/MovieCards";

function App() {
  const [movies, setMovies] = useState(moviesData.movies);

  return (
    <>
      <MovieCards movies={movies}></MovieCards>
    </>
  );
}

export default App;
