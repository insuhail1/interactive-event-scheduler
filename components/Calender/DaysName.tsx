import React from "react";
import { startOfWeek, addDays, format } from "date-fns";

interface DaysProps {
  currentMonth: Date;
}

const Days: React.FC<DaysProps> = ({ currentMonth }) => {
  const daysData = [];
  const dateFormat = "EEEE";
  const startDate = startOfWeek(currentMonth);

  for (let i = 0; i < 7; i++) {
    const day = addDays(startDate, i);
    daysData.push({
      key: i,
      label: format(day, dateFormat),
    });
  }

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2 mb-2">
      {daysData.map(({ key, label }) => (
        <div className="text-gray-500 text-center font-bold" key={key}>
          {label}
        </div>
      ))}
    </div>
  );
};

export default Days;
