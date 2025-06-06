"use client";

import { Calendar, momentLocalizer, View, Views } from "react-big-calendar";
import moment from "moment";
import { calendarEvents } from "@/lib/data";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";
import "../app/globals.css";

const localizer = momentLocalizer(moment);

const BigCalendar = () => {
  const [view, setView] = useState<View>(Views.WORK_WEEK);

  const handleOnChangeView = (selectedView: View) => {
    setView(selectedView);
  };

  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  const hasEvent = (date: Date) => {
    return calendarEvents.some(
      (event) =>
        moment(event.start).isSame(date, "day") ||
        moment(event.end).isSame(date, "day")
    );
  };

  return (
    <>
      <Calendar
        localizer={localizer}
        events={calendarEvents}
        startAccessor="start"
        endAccessor="end"
        views={["month", "week", "day", "agenda"]}
        view={view}
        style={{ height: "100%", minHeight: "400px" }}
        onView={handleOnChangeView}
        onSelectEvent={(event) => setSelectedEvent(event)}
        min={new Date(2025, 1, 0, 8, 0, 0)}
        max={new Date(2025, 1, 0, 17, 0, 0)}
        showMultiDayTimes
        dayPropGetter={(date) => {
          return {
            className: hasEvent(date) ? "has-event" : "",
          };
        }}
      />
    </>
  );
};

export default BigCalendar;
