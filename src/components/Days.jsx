export function Days({activeDay, setActiveDay, days}) {

  return (
    <div className="ml-60 flex gap-2.5 items-center text-center text-xl border-2 border-purple-900 rounded-tr-2xl rounded-bl-2xl bg-black p-3">
      {days.map((day, index) => {
        return (
          <p
            key={index}
            onClick={() => {
                setActiveDay(day);
            }}
            className={`p-3 border-2 border-purple-900 hover:bg-purple-900 hover:cursor-pointer rounded-tr-xl rounded-bl-xl
          transition-all duration-200 ease-in-out select-none hover:scale-110
          ${activeDay === day ? " bg-purple-900" : ""}`}
          >
            {day}
          </p>
        );
      })}
    </div>
  );
}
