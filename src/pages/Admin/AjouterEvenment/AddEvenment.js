import React, { useState, useEffect } from "react";
import axios from "axios";
import Menu from "../../../components/ui/menu";

const Evenment = () => {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: null,
    Type:"Carousel",
  });
  const [editEvent, setEditEvent] = useState(null); // Event to edit

  useEffect(() => {
    // Fetch initial events when component loads
    axios
      .get("http://localhost:8081/events")
      .then((response) => setEvents(response.data))
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, image: e.target.files[0] }); // Store the file itself
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("image", form.image); // Add the image file
    formData.append("Type", form.Type); 

    if (editEvent) {
      // If editing an event, update it
      axios
        .put(`http://localhost:8081/events/${editEvent.id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then(() => {
          setEditEvent(null);
          setForm({ title: "", description: "", image: null, Type:"Carousel" });
          return axios.get("http://localhost:8081/events"); // Fetch updated events
        })
        .then((response) => setEvents(response.data))
        .catch((error) => console.error("Error updating event:", error));
    } else {
      // Add a new event
      axios
        .post("http://localhost:8081/events", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then(() => {
          setForm({ title: "", description: "", image: null });
          return axios.get("http://localhost:8081/events"); // Fetch updated events
        })
        .then((response) => setEvents(response.data))
        .catch((error) => console.error("Error adding event:", error));
    }
  };

  const handleEdit = (event) => {
    setEditEvent(event);
    setForm({
      title: event.title,
      description: event.description,
      image: null, // Image will be updated only if user selects a new one
    });
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8081/events/${id}`)
      .then(() => axios.get("http://localhost:8081/events"))
      .then((response) => setEvents(response.data))
      .catch((error) => console.error("Error deleting event:", error));
  };

  return (
    <div>
        <div>
            <Menu/>
        </div>
            <div className="container mt-4">
        <h2 className="text-center mb-4">
            {editEvent ? "Modifier un Événement" : "Créer un Événement"}
        </h2>
        <form onSubmit={handleSubmit} className="mb-5">
            <div className="mb-3">
            <label htmlFor="title" className="form-label">Titre</label>
            <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={form.title}
                onChange={handleInputChange}
                required
            />
            </div>
            <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
                className="form-control"
                id="description"
                name="description"
                rows="3"
                value={form.description}
                onChange={handleInputChange}
                required
            ></textarea>
            </div>
            <div className="mb-3">
            <label htmlFor="image" className="form-label">Image</label>
            <input
                type="file"
                className="form-control"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
            />
            </div>
            <div className="mb-3">
            <label htmlFor="title" className="form-label">Type</label>
            <select name="Type" className="form-control" onChange={handleInputChange}>
              <option value="Carousel">Carousel</option>
              <option value="Evenment">Evenment</option>
            </select>
            </div>
            <button type="submit" className="btn btn-primary">
            {editEvent ? "Modifier" : "Ajouter"}
            </button>
        </form>

        <h3 className="text-center mb-4">Liste des Événements</h3>
        <table className="table">
            <thead>
            <tr>
                <th>#</th>
                <th>Titre</th>
                <th>Description</th>
                <th>Image</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {events.map((event, index) => (
                <tr key={event.id}>
                <td>{index + 1}</td>
                <td>{event.title}</td>
                <td>{event.description}</td>
                <td>
                    {event.image && (
                    <img
                        src={event.image}
                        alt={event.title}
                        style={{ width: "100px" }}
                    />
                    )}
                </td>
                <td>
                    <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEdit(event)}
                    >
                    Modifier
                    </button>
                    <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(event.id)}
                    >
                    Supprimer
                    </button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    </div>
    
  );
};

export default Evenment;
