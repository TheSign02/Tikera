import { act, useEffect, useState } from "react";

export function TicketSelector({
  totalReservedSeats = 0,
  reservedSeats,
  activeScreening,
  activeDay,
  activeMovie,
}) {
  if (!activeScreening) {
    return;
  }

  if (totalReservedSeats === 0) {
    return <h1 className="p-20 w-4/10">Please pick your seat(s).</h1>;
  }

  const ticketTypes = [
    { id: 0, type: "Adult", price: 2490, amount: 0 },
    { id: 1, type: "Student", price: 1990, amount: 0 },
    { id: 2, type: "Senior", price: 1790, amount: 0 },
  ];
  const [selectedTickets, setSelectedTickets] = useState(ticketTypes);

  const totalPrice = selectedTickets.reduce(
    (sum, ticket) => sum + ticket.price * ticket.amount,
    0
  );

  const totalTickets = selectedTickets.reduce(
    (sum, ticket) => sum + ticket.amount,
    0
  );

  useEffect(() => {
    setSelectedTickets(ticketTypes);
  }, [totalReservedSeats]);

  function ticketChangeHandler(id, action) {
    setSelectedTickets((prevTickets) =>
      prevTickets.map((ticket) =>
        ticket.id === id
          ? {
              ...ticket,
              amount:
                action === "+"
                  ? ticket.amount + 1 // Increment
                  : Math.max(ticket.amount - 1, 0), // Decrement, but prevent negative values
            }
          : ticket
      )
    );
  }

  return (
    <div className="w-1/3 ml-5 ">
      <div className="TICKETS border-3 border-purple-900 rounded-tr-[32px] rounded-bl-[32px] p-5">
        {selectedTickets.map((ticket) => {
          return (
            <div className="flex justify-between pb-2" key={ticket.id}>
              <div className="text-lg">
                {ticket.type}
                <div className="text-xs">{ticket.price} Ft</div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-3xl">
                <p
                  className={`border-2 border-purple-900 p-1 pl-3 pr-3 rounded-tr-2xl rounded-bl-2xl text-center ${
                    ticket.amount === 0
                      ? "hover:cursor-not-allowed"
                      : "hover:cursor-pointer hover:bg-purple-900"
                  }`}
                  onClick={() =>
                    ticket.amount !== 0 && ticketChangeHandler(ticket.id, "-")
                  }
                >
                  -
                </p>
                <p className="flex text-center m-auto">{ticket.amount}</p>
                <p
                  className={`border-2 border-purple-900 p-1 pl-3 pr-3 rounded-tr-2xl rounded-bl-2xl text-center ${
                    totalTickets < totalReservedSeats
                      ? "hover:cursor-pointer hover:bg-purple-900"
                      : "hover:cursor-not-allowed"
                  }`}
                  onClick={() =>
                    totalTickets < totalReservedSeats &&
                    ticketChangeHandler(ticket.id, "+")
                  }
                >
                  +
                </p>
              </div>
            </div>
          );
        })}
        <div className="flex pt-5 text-xl">
          <div className="w-1/2">
            <p className="">Total Price:</p>
            <p>{totalPrice} Ft</p>
          </div>
          <div
            className={`flex w-1/2 items-center justify-center border-2 border-purple-900 rounded-tr-2xl rounded-bl-2xl ${
              totalTickets === totalReservedSeats
                ? "hover:cursor-pointer hover:bg-purple-900"
                : "hover:cursor-not-allowed"
            }`}
          >
            <p>Reserve</p>
          </div>
        </div>
      </div>
      <div className="DIVIDER border-2 border-purple-900 m-3"></div>
      <div className="SEATS border-3 border-purple-900 rounded-tr-[20px] rounded-bl-[20px] p-5">
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
