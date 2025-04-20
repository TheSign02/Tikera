import { useEffect, useState } from "react";

export function MovieCards({ movies, activeDay, activeCard, setActiveCard }) {
  useEffect(() => {
    setActiveCard(0);
  }, [activeDay])

  return (
    <>
      <div className="flex flex-wrap pt-6">
        {movies
          .filter((movie) =>
            movie.screenings?.some(
              (screening) => screening.weekday === activeDay
            )
          )
          .map((movie, index) => {
            return (
              <div
                key={index}
                onClick={() => setActiveCard(movie.id)}
                className={`w-45 h-90 flex flex-col items-center bg-black border-3 border-purple-900 rounded-[32px] p-[12px]
               m-2 transition-all duration-300 ease-in-out hover:bg-purple-900 hover:scale-115 shadow-2xl select-none mt-5 hover:cursor-pointer
              ${activeCard === movie.id ? "bg-purple-900" : ""}`}
              >
                <img
                  className="w-45 h-60 rounded-[20px] object-cover"
                  src={`/images/${movie.image}`}
                  alt={`Image not found for ${movie.title}`}
                  draggable="false"
                />

                {/* Title */}
                <div className="w-full break-words text-wrap text-[1.1em] mt-2 text-center">
                  <p className="font-bold">{movie.title}</p>
                </div>

                {/* Genre and Minutes */}
                <div className="w-full flex justify-between text-sm mt-auto">
                  <p>{movie.genre}</p>
                  <p>{movie.duration} minutes</p>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}
