import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "tailwindcss/tailwind.css";
import "./Event.css";
import EventCreate from "../Event Create/EventCreate";
import {
  useDeleteEventMutation,
  useGetEventsQuery,
} from "../../../redux/features/api/Event/event";
import { Event } from "./config/types";
import swal from "sweetalert";
import { showSwal } from "../../../shared/Helpers/SwalShower";
import { Button } from "../../../components/ui/button";
import EventEdit from "../Event Edit/EventEdit";
import LoadingPage from "../../../common/LoadingPage/LoadingPage";

const localizer = momentLocalizer(moment);

const EventList: React.FC = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editEvent, setEditEvent] = useState<number | null>(null); // Track event to edit
  const { data: eventsData, isLoading } = useGetEventsQuery({});
  const [deleteEvent, { isLoading: deleteLoading }] = useDeleteEventMutation(); // DELETE Mutation

  const formattedEvents = eventsData?.data?.map((event: Event) => ({
    id: event.id,
    title: `${event?.name} - ${event?.branch?.name || "All Branches"}`,
    start: new Date(event?.startDate),
    end: new Date(event?.endDate),
    description: event?.description || "",
    department: event?.department?.name || "All Departments",
  }));

  // 🛑 Delete Event Function
  const handleDeleteEvent = async (eventId: number) => {
    const confirmDelete = await swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this event!",
      icon: "warning",
      buttons: ["Cancel", "Yes, delete it!"],
      dangerMode: true,
    });

    if (confirmDelete) {
      const result = await deleteEvent({ id: eventId });
      showSwal(result);
    }
  };

  // 🔍 Show Event Details with Edit & Delete Option
  const handleSelectEvent = (event: Event) => {
    swal({
      title: "Event Details",
      text: `📅 ${event?.title} \n🏢 Department: ${
        event?.department || "All Departments"
      } \n📖 Description: ${event?.description || "Enjoy your holidays!"}`,
      icon: "info",
      buttons: {
        cancel: true,
        edit: {
          text: "Edit",
          value: "edit",
        },
        delete: {
          text: "Delete",
          value: "delete",
        },
      },
    }).then((value) => {
      if (value === "delete") {
        handleDeleteEvent(event.id);
      } else if (value === "edit") {
        setEditEvent(event?.id); // Open edit modal
      }
    });
  };

  if (isLoading || deleteLoading) {
    return <LoadingPage fullPage />;
  }

  return (
    <div className="p-5 bg-componentsBackground rounded-md max-h-[calc(100vh-100px)]">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mb-4 text-center">Event Scheduler</h1>
        <Button onClick={() => setIsCreateOpen(true)}>Create Event</Button>
      </div>
      <div className="p-4">
        <Calendar
          localizer={localizer}
          events={formattedEvents}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 550 }}
          selectable
          onSelectEvent={handleSelectEvent}
          className="rounded-lg"
          eventPropGetter={() => ({
            style: {
              backgroundColor: "black",
            },
          })}
        />
      </div>

      {/* Create Event Modal */}
      <EventCreate isOpen={isCreateOpen} setIsOpen={setIsCreateOpen} />

      {editEvent && (
        <EventEdit
          isOpen={!!editEvent}
          setIsOpen={() => setEditEvent(null)}
          id={editEvent}
        />
      )}
    </div>
  );
};

export default EventList;
