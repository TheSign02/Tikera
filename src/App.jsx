import { useState } from "react";
import "./App.css";
import moviesData from "./assets/movies.json";
import { MovieCards } from "./components/MovieCards";
import { MainLayout } from "./components/MainLayout";
import { Days } from "./components/Days";
import { Details } from "./components/Details";

function App() {
  let days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const [movies, setMovies] = useState(moviesData.movies);
  const [activeCard, setActiveCard] = useState(); 
  const [activeDay, setActiveDay] = useState((days[(new Date().getDay() + 6) % 7]));
  const activeMovie = activeCard !== null ? movies.find(movie => movie.id === activeCard) : null;
  let screenings = activeMovie !== undefined
    ? activeMovie.screenings.filter(screening => screening.weekday === activeDay)
    : [];

  return (
    <MainLayout activeDay={activeDay}
      header={<Days activeDay={activeDay} setActiveDay={setActiveDay} days={days}/>}
      cards={<MovieCards activeDay={activeDay} movies={movies} activeCard={activeCard} setActiveCard={setActiveCard} />}
      details={<Details activeDay={activeDay} activeMovie={activeMovie} screenings={screenings} movies={movies} setMovies={setMovies} />}
    ></MainLayout>
  );
}

export default App;
