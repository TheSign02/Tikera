import { useState } from "react";

export function SeatSelector({
  activeScreeningId,
  sortedScreenings,
  reservedSeats,
  setReservedSeats,
}) {
  const currentScreening = sortedScreenings.find(
    (screening) => screening.id === activeScreeningId
  );

  if (!activeScreeningId) {
    return <h1 className="p-20">Please pick a time.</h1>;
  }

  if (!currentScreening) {
    return <h1>No screening found for the selected time.</h1>;
  }

  const { rows, seatsPerRow } = currentScreening.room;
  const bookings = currentScreening.bookings || [];

  const seatMatrix = Array.from({ length: rows }, (_, rowIndex) =>
    Array.from(
      { length: seatsPerRow },
      (_, seatIndex) =>
        bookings.some(
          (booking) =>
            booking.row === rowIndex + 1 && booking.seat === seatIndex + 1
        )
          ? 1 // Occupied
          : 0 // Free
    )
  );

  // Handle seat click
  const seatClickHandler = (row, seat) => {
    const seatId = [row, seat]; // Use an array as a tuple
    setReservedSeats(
      (prev) =>
        prev.some(
          (reservedSeat) =>
            reservedSeat[0] === seatId[0] && reservedSeat[1] === seatId[1]
        )
          ? prev.filter(
              (reservedSeat) =>
                !(
                  reservedSeat[0] === seatId[0] && reservedSeat[1] === seatId[1]
                )
            ) // Remove reservation
          : [...prev, seatId] // Add reservation
    );
  };

  return (
    <div className="border-3 w-6/10 h-200 p-5">
      <div className="flex gap-2 pl-1 pb-5">
        <div>
          <img
            src="images/seat-icon.png"
            alt=""
            className="h-13 bg-green-500 opacity-90"
            draggable="false"
          />
          <img
            src="images/seat-icon.png"
            alt=""
            className="h-13 bg-red-500 opacity-50 mt-2"
            draggable="false"
          />
          <img
            src="images/seat-icon.png"
            alt=""
            className="h-13 bg-purple-800 mt-2"
            draggable="false"
          />
        </div>
        <div className="flex flex-col justify-around">
          <p className="text-green-500">Free</p>
          <p className="text-red-500 opacity-90 mt-2">Reserved</p>
          <p className="text-purple-600 mt-2">Your Reservation</p>
        </div>
      </div>
      {seatMatrix.map((row, rowIndex) => (
        <div key={rowIndex} className="seat-row flex p-1 gap-2">
          {row.map((seat, seatIndex) => {
            const seatId = [rowIndex + 1, seatIndex + 1];
            const isReserved = reservedSeats.some(
              (reservedSeat) =>
                reservedSeat[0] === seatId[0] && reservedSeat[1] === seatId[1]
            );
            const isOccupied = seat === 1;

            return (
              <img
                key={seatId}
                src="images/seat-icon.png"
                alt={`Seat ${rowIndex + 1}-${seatIndex + 1}`}
                className={`h-13 transition-all duration-50 ${
                  isOccupied
                    ? "bg-red-500 cursor-not-allowed opacity-50" // Occupied seat
                    : isReserved
                    ? "bg-purple-800 hover:bg-purple-500 cursor-pointer" // Reserved seat
                    : "bg-green-500 hover:bg-purple-500 cursor-pointer opacity-90" // Free seat
                }`}
                draggable="false"
                onClick={() =>
                  !isOccupied && seatClickHandler(rowIndex + 1, seatIndex + 1)
                }
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
