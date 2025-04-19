export function Details({ activeCard, screenings, movies }) {
  const activeMovie = movies[activeCard];
  console.log(activeMovie.image);
  return (
    <div className="flex border-2 pt-10 p-2">
      <img
        className="h-110 w-90 object-cover border-5 border-black rounded-[20px]"
        src={`/images/${activeMovie.image}`}
        alt={`${activeMovie.title}`}
      />
      <div className="flex flex-col">
        <h1>{activeMovie.title}</h1>
        <p className="border-2 w-1/2">{activeMovie.description}</p>
        <p>{activeMovie.release_year}</p>
        <div className="flex">
          {screenings.map((screening, index) => (
            <p
              key={index}
              className={`p-3 border-2 border-black hover:border-white hover:cursor-pointer rounded-tr-xl rounded-bl-xl
            transition-all duration-300 ease-in-out select-none
            ${true}`}
            >
              {screening.start_time}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
