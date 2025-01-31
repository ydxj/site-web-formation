import { useState } from "react";
import "./Inscription.css"; 
import Menu from "../../components/ui/menu";
// import { Link } from 'react-router-dom';
function Inscription() {
  const [nom, setnom] = useState("");
  const [service, setservice] = useState("");
  const [formation, setformation] = useState("");
  const [date, setdate] = useState("");

  function HandleNom(e) {
    setnom(e.target.value);
  }

  function handleService(e) {
    setservice(e.target.value);
  }

  function handleFormation(e) {
    setformation(e.target.value);
  }

  function HandleDate(e) {
    setdate(e.target.value);
  }

  return (
    <div>
       <div>
        <Menu/>
      </div>

    <div className="inscription-container">
      <h2>Formulaire d'inscription</h2>
      <div className="form-group">
        <label><strong>Nom:</strong></label>
        <input type="text" value={nom} onChange={HandleNom} placeholder="Entrez votre nom" />
      </div>

      <div className="form-group">
        <label><strong>Service:</strong></label>
        <select value={service} onChange={handleService}>
          <option>--Sélectionner un service--</option>
          <option value="Urgences">Urgences</option>
          <option value="Médecine Interne">Médecine Interne</option>
          <option value="Chirurgie">Chirurgie</option>
          <option value="Radiologie">Radiologie</option>
        </select>
      </div>

      <div className="form-group">
        <label><strong>Formation:</strong></label>
        <select value={formation} onChange={handleFormation}>
          <option>--Sélectionner une formation--</option>
          <option value="Soins d'Urgences">Soins d'Urgences</option>
          <option value="Prise en Charge de la Douler">Prise en Charge de la Douler</option>
          <option value="Hygiéne et Prévention">Hygiéne et Prévention</option>
        </select>
      </div>

      <div className="form-group">
        <label><strong>Date de formation:</strong></label>
        <input type="date" value={date} onChange={HandleDate} />
      </div>

      <button className="submit-button">S'inscrire</button>
    </div>
    </div>
  );
}

export default Inscription;
