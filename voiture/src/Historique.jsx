import React, { useState, useEffect } from 'react';
import HtCard from "./HtCard";
import { ProgressSpinner } from 'primereact/progressspinner';

export default function Historique() {
  const [historique, setHistorique] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reponse = await fetch('https://autooccasionpart2-production.up.railway.app/api/annonce/annonces_of_user', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token, // Ajoutez un espace ici
          },
        });

        if(!reponse.ok){
          throw new Error('Erreur lors de la recuperation des historiques');
        }

        const data = await reponse.json();
        setHistorique(data);

      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
  }, [token]); // Assurez-vous de mettre le token dans la dépendance useEffect

  if(!historique){
    return (
      <div className="d-flex align-items-center justify-content-center vh-100">
        <div>
          <ProgressSpinner style={{ width: '50px', height: '100px' }} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <h1 className="text-start">Liste des Historiques:</h1>
          <div className="row">
          {historique.map(card => (
            <HtCard key={card.idAnnonce} prix={card.prix} date={card.date_annonce} image={card.image_car} />
          ))}
          </div>
        </div>
      </div>
    </div>
  );
}
