import React from "react";
import { format } from "date-fns";

export interface HeaderProps {
  currentMonth: Date;
  onNextMonth: () => void;
  onPrevMonth: () => void;
}

const Header: React.FC<HeaderProps> = ({
  currentMonth,
  onNextMonth,
  onPrevMonth,
}) => {
  const dateFormat = "MMMM yyyy";

  return (
    <div className="flex justify-between items-center my-4">
      <button
        onClick={onPrevMonth}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Prev
      </button>
      <h2 className="text-lg md:text-2xl font-semibold">
        {format(currentMonth, dateFormat)}
      </h2>
      <button
        onClick={onNextMonth}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Next
      </button>
    </div>
  );
};

export default Header;
