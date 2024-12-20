import React, { useEffect, useRef } from "react";
import { GetServerSideProps } from "next";
import { useDispatch } from "react-redux";

import Calendar from "@/components/Calender";
import { generateRandomEvents } from "@/utils/helper";
import { Event } from "@/typings/event";
import { addEvents } from "@/store/slices/eventSlice";

const HomePage: React.FC<{ serverEvents: Event[] }> = ({ serverEvents }) => {
  const dispatch = useDispatch();
  const hasRun = useRef(false);

  useEffect(() => {
    if (!hasRun.current) {
      dispatch(addEvents(serverEvents));
      hasRun.current = true;
    }
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

export default HomePage;
