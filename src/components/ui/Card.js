
import "../../components/ui/card.css";
function Card() {
    
    return (
        <div className="card">
            <h1>Formation : Soins d'Urgence</h1>
            <p><strong>Durée :</strong> 2 jours</p>
            <p><strong>Date :</strong> 10-12 Février 2025</p>
            <p><strong>Description :</strong> Apprenez les techniques de soins d'urgence dans différents contextes hospitaliers.</p>
            <button className="card-button">S'inscrire</button>
        </div>
    );
}

export default Card;
