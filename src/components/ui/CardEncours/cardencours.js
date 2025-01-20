import "../card.css";
function CardEncours(props){
		
	const formation = props.items
    const date_debut = new Date()
    const date_fin = new Date()
    return (
        <div className="card">
            <h1>{formation.titre}</h1>
            <p><strong>Durée :</strong> {formation.duree} jours</p>
            <p><strong>Date :</strong> {date_debut.getDate(formation.date_debut) }-{date_fin.getFullYear(formation.date_fin)} </p>
            <p><strong>Description :</strong> {formation.description}</p>
            <button className="card-button"  style={{backgroundColor:' #45a049'}}>En Cours</button>
        </div>
    );
}
export default CardEncours