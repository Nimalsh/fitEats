import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; // Adjust the path as needed
import { EventCard } from "./EventCard";
import { getAllEvents } from "../State/event/Action";

export const Events = () => {
  const dispatch = useDispatch();
  const { events, loading } = useSelector((state) => state.event);
  const jwt = localStorage.getItem("jwt"); 
  useEffect(() => {
    const jwt = localStorage.getItem("jwt"); // Assuming JWT is stored in localStorage
    dispatch(getAllEvents(jwt));
  }, [dispatch]);

  if (!jwt) {
    console.error("No token found. Please log in.");
    throw new Error("Authentication token missing.");
}

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-5 px-5 flex flex-wrap gap-5">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};
