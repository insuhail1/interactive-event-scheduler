import { format, addDays } from "date-fns";

import { Event } from "@/typings/event";

export const generateRandomEvents = (numEvents: number) => {
  const events: Event[] = [];
  for (let i = 0; i < numEvents; i++) {
    const randomOffset = Math.floor(Math.random() * 70) - 15;
    const randomDate = addDays(new Date(), randomOffset);
    const randomTitle = `Event ${i + 1}`;

    events.push({
      id: `${format(randomDate, "yyyy-MM-dd")}-${randomTitle}`,
      title: randomTitle,
      date: format(randomDate, "yyyy-MM-dd"),
      isNew: false,
    });
  }
  return events;
};
