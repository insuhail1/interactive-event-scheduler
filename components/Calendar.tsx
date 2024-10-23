import React, { useState } from "react";
import { addMonths, subMonths } from "date-fns";

import Header from "./Header";
import Days from "./Days";
import Cells from "./Cells";

const Calendar: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  return (
    <div className="p-4">
      <Header
        currentMonth={currentMonth}
        onNextMonth={nextMonth}
        onPrevMonth={prevMonth}
      />
      <Days currentMonth={currentMonth} />
      <Cells currentMonth={currentMonth} />
    </div>
  );
};

export default Calendar;
