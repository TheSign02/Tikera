import { useEffect, useState } from "react";
import { SeatSelector } from "./SeatSelector";
import { TicketSelector } from "./TicketSelector";

export function Details({ activeDay, activeMovie, screenings }) {
  const [activeScreeningId, setactiveScreeningId] = useState();
  const [reservedSeats, setReservedSeats] = useState([]);
  
  useEffect(() => {
    setactiveScreeningId(null);
    setReservedSeats([]);
  }, [activeMovie]);

  useEffect(() => {
    setReservedSeats([]);
  }, [activeScreeningId]);

  if (!activeMovie) {
    return (
      <div className="flex flex-col items-center ">
        <h1 className="pt-30 pb-20">Please pick a movie 🍿</h1>
        <img
          className="w-130 h-100 object-cover border-4 border-purple-900 rounded-tr-[60px] rounded-bl-[60px]"
          src="https://i.giphy.com/6pJNYBYSMFod2.webp"
          alt="eating popcorn gif"
        />
      </div>
    );
  }

  const sortedScreenings = screenings.sort((a, b) => a.start_time.localeCompare(b.start_time));
  const activeScreening = sortedScreenings.find(
    (screening) => screening.id === activeScreeningId
  );

  return (
    <div className="pl-5">
      <div className="flex pt-10 p-2">
        <div className="w-1/3">
          <img
            className="h-120 w-full object-cover border-3 border-purple-900 rounded-tr-[42px] rounded-bl-[42px]"
            src={`/images/${activeMovie.image}`}
            alt={`${activeMovie.title}`}
          />
        </div>
        <div className="w-3/4">
          <div className="flex flex-col w-3/4 h-3/5">
            <h1 className="font-bold pl-3">{activeMovie.title}</h1>
            <p className="text-2xl p-3">{activeMovie.release_year} l {activeMovie.genre} l {activeMovie.duration} minutes</p>
            <p className="pl-3 pb-3">{activeMovie.description}</p>
          </div>
          <div className="flex gap-2 flex-wrap pl-3 w-3/4">
            {sortedScreenings.map((screening, index) => (
              <p
                key={index}
                onClick={() => setactiveScreeningId(screening.id)}
                className={`p-3 border-2 border-purple-900 hover:bg-purple-900 hover:cursor-pointer rounded-tr-xl rounded-bl-xl
                transition-all duration-150 ease-in-out select-none mt-2 hover:scale-115
                ${activeScreeningId === screening.id ? " text-white bg-purple-900" : "bg-black"}`}
              >
                {screening.start_time}
              </p>
            ))}
          </div>
        </div>
      </div >
      <div className="flex mt-3">
        <SeatSelector activeMovie={activeMovie} activeScreeningId={activeScreeningId} activeScreening={activeScreening} reservedSeats={reservedSeats} setReservedSeats={setReservedSeats}/>
        <TicketSelector totalReservedSeats={reservedSeats.length} reservedSeats={reservedSeats} activeScreening={activeScreening} activeDay={activeDay} activeMovie={activeMovie}/>
      </div>
    </div>
  );
}
