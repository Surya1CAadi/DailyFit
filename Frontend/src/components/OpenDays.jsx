import { weekDays } from "../helperFunctions/dateFunctions.js";

function OpenDays({ openDays }) {
  const day = new Date().getDay();
  const today = weekDays[(day + 3) % 7];
  return (
    <div className="flex gap-2 mt-2">
      {weekDays.map((day, i) => (
        <div
          key={i}
          className={`w-[20px] h-[20px] inline-flex flex-col align-middle justify-center items-center rounded-full text-[10px] 
          ${openDays.includes(day) ? "bg-[#4BB543] text-white" : "bg-white"}
          ${today === day ? "border-red-500 border-2" : ""}`}
        >
          <div>{day.substring(0, 2)}</div>
        </div>
      ))}
    </div>
  );
}

export default OpenDays;
