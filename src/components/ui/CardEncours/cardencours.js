import "../card.css";
function CardEncours(props){
		
	const formation = props.items
    const formatDate = (date) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(date).toLocaleDateString('fr-FR', options);
    };
    return (
        <div className="card">
            <h1>{formation.formation_title}</h1>
            <p><strong>Durée :</strong> {formation.duree} jours</p>
            <p><strong>Date :</strong> {formatDate(formation.date_debut)}</p>
            <p><strong>Description :</strong> {formation.description}</p>
            
            {formation.status === "validated" && (
                <button className="card-button" style={{ backgroundColor: 'rgb(36, 150, 50)', width: "100%" }}>
                    Accepter
                </button>
            )}
            {formation.status === "rejected" && (
                <button className="card-button" style={{ backgroundColor: 'rgb(215, 9, 9)', width: "100%" }}>
                    Refuser
                </button>
            )}
            {formation.status === "pending" &&  (
                <button className="card-button" style={{ backgroundColor: 'rgb(35, 49, 156)', width: "100%" }}>
                    En Cours
                </button>
            )}
        </div>

    );
}
export default CardEncours