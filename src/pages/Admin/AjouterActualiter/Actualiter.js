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
    Type: "" // Added Type field
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [newsList, setNewsList] = useState([]);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.description ||
      !formData.start_date ||
      !formData.end_date ||
      !formData.image ||
      !formData.Type // Check for Type
    ) {
      setErrorMessage("Tous les champs sont obligatoires.");
      setSuccessMessage("");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("start_date", formData.start_date);
    formDataToSend.append("end_date", formData.end_date);
    //formDataToSend.append("date", formData.date); // Ensure 'date' is included here
    formDataToSend.append("image", formData.image); // Image field
    console.log(formData.start_date)


    axios
      .post("http://localhost:8081/add-actualiter", formDataToSend) // Correct URL
      .then((response) => {
        setSuccessMessage("Actualité ajoutée avec succès !");
        setErrorMessage("");
        setFormData({
          title: "",
          description: "",
          start_date: "",
          end_date: "",
          image: null,
          Type: "" // Reset Type after submit
        });
        fetchNews();
      })
      .catch((error) => {
        console.error("Erreur lors de l'ajout de l'actualité :", error);
        setErrorMessage("Erreur lors de l'ajout de l'actualité.");
        setSuccessMessage("");
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8081/delete-actualiter/${id}`)
      .then((response) => {
        fetchNews();
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression de l'actualité :", error);
      });
  };

  return (
    <div>
      <Menu/>
      <div className="container mt-4">
        <h2 className="text-center mb-4">Ajouter une Actualité</h2>
        <form onSubmit={handleSubmit} className="shadow p-4 rounded bg-light">
          {successMessage && (
            <div className="alert alert-success" role="alert">
              {successMessage}
            </div>
          )}
          {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Titre de l'actualité
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="start_date" className="form-label">
              Date de début
            </label>
            <input
              type="date"
              className="form-control"
              id="start_date"
              name="start_date"
              value={formData.start_date}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="end_date" className="form-label">
              Date de fin
            </label>
            <input
              type="date"
              className="form-control"
              id="end_date"
              name="end_date"
              value={formData.end_date}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Type" className="form-label">
              Type de l'actualité
            </label>
            <input
              type="text"
              className="form-control"
              id="Type"
              name="Type"
              value={formData.Type}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="image" className="form-label">
              Image
            </label>
            <input
              type="file"
              className="form-control"
              id="image"
              name="image"
              onChange={handleFileChange}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Ajouter l'actualité
          </button>
        </form>

        <h3 className="mt-4">Liste des Actualités</h3>
        <table className="table table-striped mt-3">
          <thead>
            <tr>
              <th scope="col">Titre</th>
              <th scope="col">Date de début</th>
              <th scope="col">Date de fin</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {newsList.map((news) => (
              <tr key={news.id}>
                <td>{news.title}</td>
                <td>{news.start_date}</td>
                <td>{news.end_date}</td>
                <td>
                  <button
                    className="btn btn-warning me-2"
                    // Add edit functionality here
                  >
                    Modifier
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(news.id)}
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

export default AjouterActualite;
