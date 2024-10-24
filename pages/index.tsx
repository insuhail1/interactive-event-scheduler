import React, { useEffect } from "react";

import Calendar from "@/components/Calendar";
import { Event } from "@/utils/typings";
import {
  ACTION_TYPES,
  EventsProvider,
  useEvents,
} from "@/context/EventsContext";
import { GetServerSideProps } from "next";
import { generateRandomEvents } from "@/utils/helper";

const HomePage: React.FC<{ serverEvents: Event[] }> = ({ serverEvents }) => {
  const { dispatch } = useEvents();

  // Add server-side generated events to the event context when the component is mounted
  useEffect(() => {
    serverEvents.forEach((event) =>
      dispatch({ type: ACTION_TYPES.ADD_EVENT, event })
    );
  }, [serverEvents, dispatch]);

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Interactive Event Scheduler
      </h1>
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
