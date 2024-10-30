import React from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/Button";

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
      <Button
        onClick={onPrevMonth}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Prev
      </Button>
      <h2 className="text-lg md:text-2xl font-semibold">
        {format(currentMonth, dateFormat)}
      </h2>
      <Button
        onClick={onNextMonth}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Next
      </Button>
    </div>
  );
};

export default Header;
