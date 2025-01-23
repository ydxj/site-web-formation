import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Inscription from "../../pages/users/Inscription"
import Card from "../ui/Card"

function FormationCard(){

    const [formations, setFormations] = useState([]);
    const [error, setError] = useState('');
    
    useEffect(() => {
        fetchFormations();
      }, []);
    
    const fetchFormations = async () => {
    try {
        const response = await axios.get('http://localhost:8081/formations');
        console.log(response.data)
        setFormations(response.data);
    } catch (err) {
        console.error('Error fetching formations:', err);
        setError('Unable to fetch formations.');
    }
    };

    return(
        <div>
            
            <div>
			<h2 className="card-title"
			style={{
				color: 'black', 
				width: '80%', 
				margin: '20px auto', 
				padding: '20px', 
				fontFamily: "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif", // Correction de "fontFfamily"
				textAlign: 'center',
				fontSize: '32px', 
				fontWeight: 'bold', 
				borderRadius: '10px', 
				boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', 
				letterSpacing: '1px', 
			}}>
			Gestion de formations-CHU
			</h2>
			</div>
            {error && <div className="alert">{error}</div>}
			<div>
                {formations.map((data,index)=>
                    <Card items={data}/>
                )}
			</div>
			<div >
				<Inscription/>
			</div>
		
        </div>
    )
}
export default FormationCard