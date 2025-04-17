"use client";

import Image from "next/image";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const allEvents = [
  {
    id: 1,
    title: "Meeting with Client",
    start: new Date(2025, 3, 14, 10, 0),
    end: new Date(2025, 3, 14, 11, 0),
    description: "Discuss project requirements",
  },
  {
    id: 2,
    title: "Team Standup",
    start: new Date(2025, 3, 14, 9, 0),
    end: new Date(2025, 3, 14, 9, 30),
    description: "Daily progress updates",
  },
  {
    id: 3,
    title: "Foundation Day",
    start: new Date(2025, 3, 14, 9, 0),
    end: new Date(2025, 3, 14, 16, 30),
    description: "Celebrating our foundation day",
  },
  {
    id: 4,
    title: "Project Demo",
    start: new Date(2025, 3, 17, 14, 0),
    end: new Date(2025, 3, 17, 15, 0),
    description: "Showcase MVP to stakeholders",
  },
];

const EventCalendar = () => {
  const [value, onChange] = useState<Value>(new Date());

  // Format selected date to YYYY-MM-DD
  const selectedDate =
    value instanceof Date
      ? moment(value).format("YYYY-MM-DD")
      : moment(value?.[0]).format("YYYY-MM-DD");

  // Filter Events based on selected date
  const filteredEvents = allEvents.filter(
    (event) => moment(event.start).format("YYYY-MM-DD") === selectedDate
  );

  return (
    <div className="bg-white p-4 rounded-md shadow-sm w-full max-w-md mx-auto">
      <Calendar onChange={onChange} value={value} className="react-calendar" />

      <div className="flex items-center justify-between mt-4 mb-2">
        <h1 className="text-lg font-semibold">Events</h1>
        <Image src="/moreDark.png" alt="more" width={20} height={20} />
      </div>

      {filteredEvents.length > 0 ? (
        <div className="flex flex-col gap-3">
          {filteredEvents.map((event, index) => (
            <div
              key={event.id}
              className={`border-2 rounded-md p-4 border-t-4 ${
                index % 2 === 0 ? "border-t-cyan-400" : "border-t-purple-400"
              }`}
            >
              <div className="flex justify-between items-center">
                <h2 className="font-semibold text-gray-700">{event.title}</h2>
                <span className="text-xs text-gray-400">
                  {moment(event.start).format("h:mm A")} -{" "}
                  {moment(event.end).format("h:mm A")}
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-1">{event.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-400 mt-6">
          No Events for this date
        </div>
      )}
    </div>
  );
};

export default EventCalendar;
