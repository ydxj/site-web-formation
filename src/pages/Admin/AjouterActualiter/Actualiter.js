import React, { useState, useEffect } from "react";
import axios from "axios";
import Menu from "../../../components/ui/menu";

const AjouterActualite = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    start_date: "",
    end_date: "",
    image: null,
    Type: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [newsList, setNewsList] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await axios.get("http://localhost:8081/get-news");
      setNewsList(response.data);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.start_date || !formData.end_date || !formData.Type) {
      setErrorMessage("Tous les champs sont obligatoires.");
      setSuccessMessage("");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("start_date", formData.start_date);
    formDataToSend.append("end_date", formData.end_date);
    formDataToSend.append("Type", formData.Type);
    if (formData.image) formDataToSend.append("image", formData.image);

    try {
      if (editingId) {
        await axios.put(`http://localhost:8081/edit-actualiter/${editingId}`, formDataToSend);
        setSuccessMessage("Actualité mise à jour avec succès !");
      } else {
        await axios.post("http://localhost:8081/add-actualiter", formDataToSend);
        setSuccessMessage("Actualité ajoutée avec succès !");
      }
      setErrorMessage("");
      setFormData({ title: "", description: "", start_date: "", end_date: "", image: null, Type: "" });
      setEditingId(null);
      fetchNews();
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'actualité :", error);
      setErrorMessage("Erreur lors de l'envoi de l'actualité.");
      setSuccessMessage("");
    }
  };

  const handleEdit = (news) => {
    setFormData({
      title: news.title,
      description: news.description,
      start_date: news.start_date ? news.start_date.split("T")[0] : "",
      end_date: news.end_date ? news.end_date.split("T")[0] : "",
      Type: news.Type,
      image: news.image || null
    });
    setEditingId(news.id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/delete-actualiter/${id}`);
      fetchNews();
    } catch (error) {
      console.error("Erreur lors de la suppression de l'actualité :", error);
    }
  };

  return (
    <div>
      <Menu />
      <div className="container mt-4">
        <h2 className="text-center mb-4">{editingId ? "Modifier l'Actualité" : "Ajouter une Actualité"}</h2>
        <form onSubmit={handleSubmit} className="shadow p-4 rounded bg-light">
          {successMessage && <div className="alert alert-success">{successMessage}</div>}
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

          <div className="mb-3">
            <label className="form-label">Titre de l'actualité</label>
            <input type="text" className="form-control" name="title" value={formData.title} onChange={handleChange} />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea className="form-control" name="description" rows="4" value={formData.description} onChange={handleChange}></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label">Date de début</label>
            <input type="date" className="form-control" name="start_date" value={formData.start_date} onChange={handleChange} />
          </div>

          <div className="mb-3">
            <label className="form-label">Date de fin</label>
            <input type="date" className="form-control" name="end_date" value={formData.end_date} onChange={handleChange} />
          </div>

          <div className="mb-3">
            <label className="form-label">Type de l'actualité</label>
            <input type="text" className="form-control" name="Type" value={formData.Type} onChange={handleChange} />
          </div>

          <div className="mb-3">
            <label className="form-label">Image</label>
            <input type="file" className="form-control" name="image" onChange={handleFileChange} />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            {editingId ? "Modifier l'actualité" : "Ajouter l'actualité"}
          </button>
        </form>

        <h3 className="mt-4">Liste des Actualités</h3>
        <table className="table table-striped mt-3">
          <thead>
            <tr>
              <th>Titre</th>
              <th>Date de début</th>
              <th>Date de fin</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {newsList.map((news) => (
              <tr key={news.id}>
                <td>{news.title}</td>
                <td>{news.start_date}</td>
                <td>{news.end_date}</td>
                <td>
                  <button className="btn btn-warning me-2" onClick={() => handleEdit(news)}>Modifier</button>
                  <button className="btn btn-danger" onClick={() => handleDelete(news.id)}>Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AjouterActualite;
