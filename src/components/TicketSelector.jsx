import { useState } from "react";

export function TicketSelector({ totalReservedSeats = 0, reservedSeats }) {
  if (totalReservedSeats === 0) {
    return <h1 className="p-20 w-4/10">Please pick your seat(s).</h1>;
  }

  const [selectedTickets, setSelectedTickets] = useState([0, 0, 0]);
  const [totalPrice, setTotalPrice] = useState(0);

  const ticketTypes = [
    { id: 0, type: "Adult", price: 3000 },
    { id: 1, type: "Student", price: 2000 },
    { id: 2, type: "Senior", price: 2500 },
  ];

  function ticketClickHandler(id, action) {
    console.log("Hello!");
  }

  return (
    <div className="w-1/3 m-5">
      <div className="TICKETS border-2 border-purple-900 rounded-2xl p-5">
        {ticketTypes.map((ticketType) => {
          return (
            <div className="flex justify-between pb-2" key={ticketType.id}>
              <div className="text-lg">
                {ticketType.type}
                <div className="text-xs">{ticketType.price} Ft</div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-3xl">
                <p
                  className={`border-2 border-purple-900 p-1 pl-3 pr-3 rounded-xl text-center ${
                    selectedTickets[ticketType.id] === 0
                      ? "hover:cursor-not-allowed"
                      : "hover:cursor-pointer"
                  }`}
                  onClick={() =>
                    selectedTickets[ticketType.id] > 0 &&
                    ticketClickHandler(ticketType.id, "decrement")
                  }
                >
                  -
                </p>
                <p className="flex text-center m-auto">
                  {selectedTickets[ticketType.id]}
                </p>
                <p
                  className="border-2 border-purple-900 p-1 pl-3 pr-3 rounded-xl text-center hover:cursor-pointer"
                  onClick={() => ticketClickHandler(1)}
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
          <div className="w-1/2 text-center border-2 border-purple-900 rounded-2xl">
            <p>Reserve</p>
          </div>
        </div>
      </div>
      <div className="DIVIDER border-2 border-purple-900 m-3"></div>
      <div className="SEATS border-2 border-purple-900 rounded-2xl p-5">
        <p className="mb-2">
          {totalReservedSeats === 1
            ? "Your reserved seat:"
            : "Your reserved seats:"}
        </p>
        <div className="flex flex-col gap-1">
          {reservedSeats.map((reservedSeat, index) => {
            return (
              <div className="flex gap-2" key={index}>
                <p>Seat #{index + 1}</p>
                <p>Row: {reservedSeat[0]}</p>
                <p>Column: {reservedSeat[1]}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
