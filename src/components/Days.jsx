import { useState } from "react";

export function Days({activeDay, setActiveDay, days}) {

  return (
    <div className="ml-60 flex gap-3 items-center text-center text-xl">
      {days.map((day, index) => {
        return (
          <p
            key={index}
            onClick={() => {
                setActiveDay(day);
            }}
            className={`p-3 border-2 border-black hover:border-white hover:cursor-pointer rounded-tr-xl rounded-bl-xl
          transition-all duration-300 ease-in-out select-none
          ${activeDay === day ? "bg-purple-900 border-gray-300" : ""}`}
          >
            {day}
          </p>
        );
      })}
    </div>
  );
}
