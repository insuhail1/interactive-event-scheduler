import React, { useEffect } from "react";
import { GetServerSideProps } from "next";

import {
  ACTION_TYPES,
  EventsProvider,
  useEvents,
} from "@/context/EventsContext";

import Calendar from "@/components/Calender";
import { generateRandomEvents } from "@/utils/helper";
import { Event } from "@/typings/event";

const HomePage: React.FC<{ serverEvents: Event[] }> = ({ serverEvents }) => {
  const { dispatch } = useEvents();

  // Add server-side generated events to the event context when the component is mounted
  useEffect(() => {
    serverEvents.forEach((event) =>
      dispatch({ type: ACTION_TYPES.ADD_EVENT, event }),
    );
  }, [serverEvents, dispatch]);

  return (
    <div className="mx-auto px-2 md:px-4">
      <Calendar />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const serverEvents = generateRandomEvents(10);
  return {
    props: {
      serverEvents,
    },
  };
};

const HomePageWrapper = ({ serverEvents }: { serverEvents: Event[] }) => (
  <EventsProvider>
    <HomePage serverEvents={serverEvents} />
  </EventsProvider>
);

export default HomePageWrapper;
