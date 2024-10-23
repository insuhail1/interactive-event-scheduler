import { format, addDays } from "date-fns";
import { Event } from "./typings";

export const generateRandomEvents = (numEvents: number) => {
  const events: Event[] = [];
  for (let i = 0; i < numEvents; i++) {
    const randomOffset = Math.floor(Math.random() * 30); // Random number between 0 and 30 days
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
