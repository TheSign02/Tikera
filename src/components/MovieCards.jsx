import { useState } from "react";

export function MovieCards({ movies }) {
  const [activeCard, setActiveCard] = useState();

  return (
    <>
      <div className="flex flex-wrap">
        {movies.map((movie, index) => {
          return (
            <div
              key={index}
              onClick={() => setActiveCard(index)}
              className={`w-45 h-90 flex flex-col items-center bg-black border-3 border-black
              rounded-[32px] p-[12px] m-2 transition-all duration-300 ease-in-out hover:bg-purple-800 hover:scale-118 drop-shadow-2xl
              ${activeCard === index ? "bg-purple-900 border-black" : ""}`}
            >
              <img
                className="w-45 h-60 rounded-[20px] object-cover"
                src={`/images/${movie.image}`}
                alt={`Image not found for ${movie.title}`}
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
