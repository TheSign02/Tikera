import { act, useState } from "react";
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
  const [activeCard, setActiveCard] = useState(0);
  const [activeDay, setActiveDay] = useState(days[new Date().getDay()]);
  let screenings = movies[activeCard].screenings.filter(screening => screening.weekday === activeDay);

  return (
    <MainLayout activeDay={activeDay}
      header={<Days activeDay={activeDay} setActiveDay={setActiveDay} days={days}/>}
      cards={<MovieCards activeDay={activeDay} movies={movies} activeCard={activeCard} setActiveCard={setActiveCard} />}
      details={<Details activeCard={activeCard} screenings={screenings} movies={movies} />}
    ></MainLayout>
  );
}

export default App;
