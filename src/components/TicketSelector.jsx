import { useEffect, useState } from "react";
import { Reservation } from "./Reservation";

export function TicketSelector({
  totalReservedSeats = 0,
  reservedSeats,
  activeScreening,
  activeDay,
  activeMovie,
  setMovies,
  setReservedSeats,
  setIsModalOpen,
  selectedTickets,
  setSelectedTickets,
  ticketTypes,
  handleReserve,
}) {
  if (!activeScreening) {
    return;
  }

  if (totalReservedSeats === 0) {
    return <h1 className="p-20 w-4/10">Please pick your seat(s).</h1>;
  }

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
                  ? ticket.amount + 1
                  : Math.max(ticket.amount - 1, 0),
            }
          : ticket
      )
    );
  }

  return (
    <div className="w-1/3 ml-5 ">
      {/* Tickets */}
      <div className="border-3 border-purple-900 rounded-tr-[32px] rounded-bl-[32px] p-5">
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
            onClick={() => {
              if (totalTickets === totalReservedSeats) {
                // Update the movies state to mark seats as reserved
                setMovies((prevMovies) =>
                  prevMovies.map((movie) =>
                    movie.id === activeMovie.id
                      ? {
                          ...movie,
                          screenings: movie.screenings.map((screening) =>
                            screening.id === activeScreening.id
                              ? {
                                  ...screening,
                                  bookings: [
                                    ...screening.bookings,
                                    ...reservedSeats.map(([row, seat]) => ({
                                      row,
                                      seat,
                                    })),
                                  ],
                                }
                              : screening
                          ),
                        }
                      : movie
                  )
                );

                // Open the modal
                handleReserve();

                // Delay state reset to allow modal to render with current data
                setReservedSeats([]);
                setSelectedTickets(ticketTypes);
              } else {
                console.log("Total tickets do not match total reserved seats.");
              }
            }}
          >
            <p>Reserve</p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-2 border-purple-900 m-3"></div>

      {/* Reservation */}
      <div>
        <Reservation
          totalReservedSeats={totalReservedSeats}
          reservedSeats={reservedSeats}
          activeScreening={activeScreening}
          activeDay={activeDay}
          activeMovie={activeMovie}
          selectedTickets={selectedTickets}
        />
      </div>
    </div>
  );
}
