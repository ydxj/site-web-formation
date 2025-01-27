import React, { useState } from "react";

const EventsList = ({ events, onEventClick }) => {
  const [hoveredEvent, setHoveredEvent] = useState(null);

  return (
    <div className="container mt-5">
      <h2
        className="text-center mb-5"
        style={{
          fontWeight: "bold",
          fontSize: "2rem",
          color: "#2a6478",
          textTransform: "uppercase",
        }}
      >
         Événements
      </h2>
      <div className="row">
        {/* Events List Section */}
        <div className="col-md-7">
          <ul
            className="list-group shadow"
            style={{
              borderRadius: "10px",
              overflow: "hidden",
              border: "1px solid #e0e0e0",
            }}
          >
            {events.map((event) => (
              <li
                key={event.id}
                className="list-group-item d-flex justify-content-between align-items-center"
                onMouseEnter={() => setHoveredEvent(event)}
                onMouseLeave={() => setHoveredEvent(null)}
                onClick={() => onEventClick(event)}
                style={{
                  cursor: "pointer",
                  padding: "20px",
                  backgroundColor: hoveredEvent?.id === event.id ? "#e6f7f9" : "#ffffff",
                  borderBottom: "1px solid #e0e0e0",
                  transition: "all 0.3s ease",
                }}
              >
                <div>
                  <strong style={{ color: "#226f80", fontSize: "1.1rem" }}>
                    {event.title}
                  </strong>
                  <p className="mb-0 text-muted" style={{ fontSize: "0.9rem" }}>
                    {event.date}
                  </p>
                </div>
                <span
                  className={`badge ${
                    event.status === "À venir"
                      ? "bg-info text-white"
                      : event.status === "En cours"
                      ? "bg-warning text-dark"
                      : "bg-danger"
                  }`}
                  style={{
                    fontSize: "0.85rem",
                    padding: "8px 12px",
                    borderRadius: "20px",
                    minWidth: "90px",
                    textAlign: "center",
                  }}
                >
                  {event.status}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Event Hover Details Section */}
        <div className="col-md-5">
          {hoveredEvent ? (
            <div
              className="shadow-lg p-4 bg-white rounded"
              style={{
                border: "1px solid #e0e0e0",
                textAlign: "center",
                transition: "transform 0.3s ease",
              }}
            >
              <img
                src={hoveredEvent.image}
                alt={hoveredEvent.title}
                className="img-fluid rounded"
                style={{
                  maxHeight: "150px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  marginBottom: "20px",
                }}
              />
              <h5
                className="mb-2"
                style={{
                  color: "#226f80",
                  fontWeight: "bold",
                  fontSize: "1.3rem",
                }}
              >
                {hoveredEvent.title}
              </h5>
              <p
                className="text-muted"
                style={{
                  fontSize: "1rem",
                  lineHeight: "1.5",
                }}
              >
                {hoveredEvent.description || "Description non disponible."}
              </p>
            </div>
          ) : (
            <div
              className="shadow-lg p-4 bg-light rounded text-center"
              style={{
                border: "1px solid #e0e0e0",
                color: "#999",
                fontStyle: "italic",
              }}
            >
              <p>Aucune prévisualisation sélectionnée.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventsList;
