import React, { useState, useEffect } from 'react';
import FavCard from "./FavCard";
import { ProgressSpinner } from 'primereact/progressspinner';

export default function Favoris() {
  const [favoris, setFavoris] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reponse = await fetch('http://localhost:8081/api/favoris/liste_favoris_user', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
          },
        });

        if (!reponse.ok) {
          throw new Error('Erreur lors de la récupération des favoris');
        }

        const data = await reponse.json();
        setFavoris(data);

      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
  }, [token]);

  if (!favoris) {
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
          <h1 className="text-start">Liste des favoris:</h1>
          <div className="row">
            {favoris.map(card => (
              <FavCard key={card.idAnnonce} annonce={card.idAnnonce} idvoiture={card.idCar} prix={card.prix} date={card.date_annonce} image={card.image_car} lieu={card.lieu} descs={card.description} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
