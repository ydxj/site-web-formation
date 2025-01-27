import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Formations.css';
import Menu from '../../../components/ui/menu';

function Formations() {
  const [formations, setFormations] = useState([]);
  const [newFormation, setNewFormation] = useState({
    titre: '',
    duree: '',
    date_debut: '',
    date_fin: '',
    description: '',
    file : null,
  });
  const [editingFormation, setEditingFormation] = useState(null);
  const [error, setError] = useState('');
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  useEffect(() => {
    fetchFormations();
  }, []);

  const fetchFormations = async () => {
    try {
      const response = await axios.get('http://localhost:8081/formations');
      setFormations(response.data);
    } catch (err) {
      console.error('Error fetching formations:', err);
      setError('Unable to fetch formations.');
    }
  };

  const addOrEditFormation = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('titre', newFormation.titre);
    formData.append('duree', newFormation.duree);
    formData.append('description', newFormation.description);
    formData.append('date_debut', newFormation.date_debut);
    formData.append('date_fin', newFormation.date_fin);

    if (newFormation.file) {
      formData.append('file', newFormation.file); // Attach the file
    }

    if (editingFormation) {
      try {

        await axios.put(`http://localhost:8081/formations/${editingFormation.id}`, newFormation);
        setFormations(
          formations.map((formation) =>
            formation.id === editingFormation.id ? { ...editingFormation, ...newFormation } : formation
          )
        );
        resetForm();
      } catch (err) {
        console.error('Error updating formation:', err);
        setError('Unable to update formation.');
      }
    } else {
      try {
        const response = await axios.post('http://localhost:8081/formations',
           formData,
          { headers: { 'Content-Type': 'multipart/form-data' } });
        setFormations([...formations, { ...newFormation, id: response.data.id }]);
        resetForm();
      } catch (err) {
        console.error('Error adding formation:', err);
        setError('Unable to add formation.');
      }
    }
  };

  const deleteFormation = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/formations/${id}`);
      setFormations(formations.filter((formation) => formation.id !== id));
    } catch (err) {
      console.error('Error deleting formation:', err);
      setError('Unable to delete formation.');
    }
  };

  const resetForm = () => {
    setNewFormation({ titre: '', duree: '', date_debut: '', date_fin: '', description: '',file:null });
    setEditingFormation(null);
  };

  const startEditing = (formation) => {
    setEditingFormation(formation);
    setNewFormation({
      titre: formation.titre,
      duree: formation.duree,
      date_debut: formation.date_debut,
      date_fin: formation.date_fin,
      description: formation.description,
      file : formation.file,
    });
  };

  return (
    <div>
        <div>
          <Menu />
        </div>
        <div className="formations-container">
        <h1>Formations</h1>

        {error && <div className="alert">{error}</div>}

        <form onSubmit={addOrEditFormation} className="formation-form">
          <h2>{editingFormation ? 'Edit Formation' : 'Add Formation'}</h2>

          <div className="form-group">
            <label htmlFor="titre">Title</label>
            <input
              id="titre"
              type="text"
              value={newFormation.titre}
              onChange={(e) => setNewFormation({ ...newFormation, titre: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="duree">Durée</label>
            <input
              id="duree"
              type="text"
              value={newFormation.duree}
              onChange={(e) => setNewFormation({ ...newFormation, duree: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="date_debut">Date de début</label>
            <input
              id="date_debut"
              type="date"
              value={newFormation.date_debut}
              onChange={(e) => setNewFormation({ ...newFormation, date_debut: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="date_fin">Date de fin</label>
            <input
              id="date_fin"
              type="date"
              value={newFormation.date_fin}
              onChange={(e) => setNewFormation({ ...newFormation, date_fin: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={newFormation.description}
              onChange={(e) => setNewFormation({ ...newFormation, description: e.target.value })}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="file">Insérer un fichier</label>
            <input
              type="file"
              id="file"
              onChange={(e) => setNewFormation({ ...newFormation, file: e.target.files[0] })}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            {editingFormation ? 'Update' : 'Add'}
          </button>
          {editingFormation && (
            <button type="button" onClick={resetForm} className="btn btn-secondary">
              Annuler
            </button>
          )}
        </form>
      </div>

      <table >
          <thead>
            <tr>
              <th style={{textAlign:'center'}}>Title</th>
              <th style={{textAlign:'center'}}>Durée</th>
              <th style={{width:"150px",textAlign:'center'}}>Date de début</th>
              <th style={{width:"150px",textAlign:'center'}}>Date de fin</th>
              <th style={{textAlign:'center'}}>Description</th>
              <th style={{textAlign:'center'}}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {formations.length > 0 ? (
              formations.map((formation) => (
                <tr key={formation.id}>
                  <td>{formation.titre}</td>
                  <td>{formation.duree}</td>
                  <td>{formatDate(formation.date_debut)}</td>
                  <td>{formatDate(formation.date_fin)}</td>
                  <td>{formation.description}</td>
                  <td>
                    <button className='button1'
                      onClick={() => startEditing(formation)}
                      
                    >
                      Modifier
                    </button>
                    <button className='button2'
                      onClick={() => deleteFormation(formation.id)}
                      
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" >
                Aucune formation trouvée.
                </td>
              </tr>
            )}
          </tbody>
        </table>
    </div>
    
  );
}

export default Formations;
