export function Reservation({
  totalReservedSeats,
  reservedSeats,
  activeScreening,
  activeDay,
  activeMovie,
  selectedTickets,
}) {
    if (!activeScreening) {
        return <div className="p-5">Loading reservation details...</div>;
      }
      
  return (
    <div>
      <div className="border-3 border-purple-900 rounded-tr-[20px] rounded-bl-[20px] p-5 bg-black">
        <p className="text-3xl mb-10 underline decoration-purple-900 font-bold text-center">
          Your Reservation
        </p>
        <div className="flex flex-col text-xl">
          <p>{activeMovie.title}</p>
          <p>
            {activeDay} {activeScreening.start_time}
          </p>
        </div>
        <div className="mt-5 flex justify-around">
          {selectedTickets.map((ticket) => {
            return ticket.amount !== 0 ? (
              <div>
                <p>
                  {ticket.amount} x {ticket.type}
                </p>
                <p>{ticket.price * ticket.amount} Ft</p>
              </div>
            ) : null;
          })}
        </div>
        <p className="mt-5 mb-2">
          {totalReservedSeats === 1 ? "Your seat:" : "Your seats:"}
        </p>
        <div className="flex flex-col gap-1">
          {reservedSeats.map((reservedSeat, index) => {
            return (
              <div className="flex gap-2" key={index}>
                <p>{index + 1}.</p>
                <p>Row: {reservedSeat[0]}</p>
                <p>Column: {reservedSeat[1]}</p>
              </div>
            );
          })}
        </div>
        <div>
          <p className="text-4xl mb-3"></p>
        </div>
      </div>
    </div>
  );
}
