// Frontend (React) - CalendarComponent.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const CalendarComponent = () => {
  const [events, setEvents] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await axios.get("/api/calendar/events");
      setIsAuthenticated(true);
      setEvents(response.data);
    } catch (error) {
      if (error.response?.status === 401) {
        setIsAuthenticated(false);
      }
    }
  };

  const handleAuthClick = async () => {
    try {
      const response = await axios.get("/api/calendar/auth-url");
      window.location.href = response.data.authUrl;
    } catch (error) {
      console.error("Failed to get auth URL:", error);
    }
  };

  const handleCreateEvent = async () => {
    try {
      const eventDetails = {
        summary: "New Meeting",
        location: "Virtual",
        description: "Discussion about project progress",
        start: {
          dateTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Tomorrow
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
        end: {
          dateTime: new Date(Date.now() + 25 * 60 * 60 * 1000).toISOString(), // Tomorrow + 1 hour
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
        attendees: [{ email: "attendee@example.com" }],
        reminders: {
          useDefault: true,
        },
      };

      const response = await axios.post("/api/calendar/events", eventDetails);
      console.log("Event created:", response.data);
      checkAuth(); // Refresh events list
    } catch (error) {
      console.error("Failed to create event:", error);
    }
  };

  return (
    <div className="p-4">
      {!isAuthenticated ? (
        <button
          onClick={handleAuthClick}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Connect Google Calendar
        </button>
      ) : (
        <div>
          <button
            onClick={handleCreateEvent}
            className="bg-green-500 text-white px-4 py-2 rounded mb-4"
          >
            Create Test Event
          </button>

          <h2 className="text-xl font-bold mb-4">Upcoming Events</h2>
          <div className="space-y-4">
            {events.map((event) => (
              <div key={event.id} className="border p-4 rounded">
                <h3 className="font-bold">{event.summary}</h3>
                <p>{new Date(event.start.dateTime).toLocaleString()}</p>
                {event.description && <p>{event.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarComponent;
