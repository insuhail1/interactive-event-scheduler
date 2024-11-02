import React, { useState } from "react";
import { addMonths, subMonths } from "date-fns";

import Header from "./Header";
import Cells from "./Cells";

const Calendar: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  return (
    <>
      <Header
        currentMonth={currentMonth}
        onNextMonth={nextMonth}
        onPrevMonth={prevMonth}
      />
      <Cells currentMonth={currentMonth} />
    </>
  );
};

export default Calendar;
