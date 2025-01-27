import React from "react";

const EventDetails = ({ event, onBack }) => {
  return (
    <div className="event-details">
      <button onClick={onBack} className="btn btn-success mb-3">
        Retour
      </button>
      <h2>{event.title}</h2>
      <img
        src={event.image}
        alt={event.title}
        style={{ width: "30%", height: "auto", borderRadius: "10px" }}
      />
      
    </div>
  );
};

export default EventDetails;
