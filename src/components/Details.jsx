import { useEffect, useState } from "react";
import { SeatSelector } from "./SeatSelector";
import { TicketSelector } from "./TicketSelector";
import { createPortal } from "react-dom";
import { Reservation } from "./Reservation";

export function Details({ activeDay, activeMovie, screenings, setMovies }) {
  const [activeScreeningId, setactiveScreeningId] = useState();
  const [reservedSeats, setReservedSeats] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const ticketTypes = [
    { id: 0, type: "Adult", price: 2490, amount: 0 },
    { id: 1, type: "Student", price: 1990, amount: 0 },
    { id: 2, type: "Senior", price: 1790, amount: 0 },
  ];
  const [selectedTickets, setSelectedTickets] = useState(ticketTypes);
  const [modalData, setModalData] = useState([]);

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

  const sortedScreenings = screenings.sort((a, b) =>
    a.start_time.localeCompare(b.start_time)
  );
  const activeScreening = sortedScreenings.find(
    (screening) => screening.id === activeScreeningId
  );

  const handleReserve = () => {
    // Save the reservation data for the modal
    const data = {
      totalReservedSeats: reservedSeats.length,
      reservedSeats,
      activeScreening,
      activeDay,
      activeMovie,
      selectedTickets,
    };

    console.log("Setting modalData:", data); // Debug modalData
    setModalData(data);

    // Open the modal
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
    setModalData(null); // Clear modal data
    setReservedSeats([]); // Reset reserved seats
    setSelectedTickets(ticketTypes); // Reset ticket selection
  };

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
            <p className="text-2xl p-3">
              {activeMovie.release_year} l {activeMovie.genre} l{" "}
              {activeMovie.duration} minutes
            </p>
            <p className="pl-3 pb-3">{activeMovie.description}</p>
          </div>
          <div className="flex gap-2 flex-wrap pl-3 w-3/4">
            {sortedScreenings.map((screening, index) => (
              <p
                key={index}
                onClick={() =>
                  screening.room.rows * screening.room.seatsPerRow ===
                  screening.bookings.length
                    ? ""
                    : setactiveScreeningId(screening.id)
                }
                className={`p-3 border-2 border-purple-900 rounded-tr-xl rounded-bl-xl
                  transition-all duration-150 ease-in-out select-none mt-2
                  ${
                    screening.room.rows * screening.room.seatsPerRow ===
                    screening.bookings.length
                      ? "hover:cursor-not-allowed"
                      : `hover:cursor-pointer hover:bg-purple-900 hover:scale-115 ${
                          activeScreeningId === screening.id
                            ? "text-white bg-purple-900"
                            : "bg-black"
                        }`
                  }`}
              >
                {screening.start_time}
              </p>
            ))}
          </div>
        </div>
      </div>
      <div className="flex mt-3">
        <SeatSelector
          activeMovie={activeMovie}
          activeScreeningId={activeScreeningId}
          activeScreening={activeScreening}
          reservedSeats={reservedSeats}
          setReservedSeats={setReservedSeats}
        />
        <TicketSelector
          totalReservedSeats={reservedSeats.length}
          reservedSeats={reservedSeats}
          activeScreening={activeScreening}
          activeDay={activeDay}
          activeMovie={activeMovie}
          setMovies={setMovies}
          setReservedSeats={setReservedSeats}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          selectedTickets={selectedTickets}
          setSelectedTickets={setSelectedTickets}
          ticketTypes={ticketTypes}
          handleReserve={handleReserve}
        />
      </div>
      {/* Reservation Modal */}
      {isModalOpen &&
        createPortal(
          <div className="modal-background fixed inset-0 bg-black flex items-center justify-center">
            <div className="modal-content max-h-[80vh] w-[40vw] overflow-y-auto bg-black p-5 rounded-lg shadow-lgmax-h-10 flex flex-col gap-5">
              <Reservation {...modalData} />
              <div className="flex justify-center text-center">
                <p
                  className="bg-purple-900 text-white px-4 py-2 rounded hover:bg-purple-700 hover:cursor-pointer w-[20%] rounded-tr-[10px] rounded-bl-[10px]"
                  onClick={handleCloseModal}
                >
                  Close
                </p>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
