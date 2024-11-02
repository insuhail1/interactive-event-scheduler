import React from "react";
import { Button } from "@/components/ui/Button";
import { startOfWeek, addDays, format } from "date-fns";

interface HeaderProps {
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
  const startDate = startOfWeek(new Date());

  return (
    <div className="my-4">
      <div className="flex items-center justify-between">
        <Button
          onClick={onPrevMonth}
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
        >
          Prev
        </Button>
        <h2 className="text-lg font-semibold md:text-2xl">
          {format(currentMonth, dateFormat)}
        </h2>
        <Button
          onClick={onNextMonth}
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
        >
          Next
        </Button>
      </div>

      <div className="mb-2 mt-6 grid grid-cols-7">
        {Array.from({ length: 7 }, (_, i) => (
          <div key={i} className="text-center font-bold text-gray-500">
            <span className="hidden md:block">
              {format(addDays(startDate, i), "EEEE")}
            </span>
            <span className="block md:hidden">
              {format(addDays(startDate, i), "EE")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Header;
