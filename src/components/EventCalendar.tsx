"use client";

import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const EventCalendar = () => {
  const [value, onChange] = useState<Value>(new Date());

  return (
    <div className="bg-white p-4 rounded-md shadow-sm w-full max-w-md mx-auto">
      <Calendar onChange={onChange} value={value} className="react-calendar" />
    </div>
  );
};

export default EventCalendar;
