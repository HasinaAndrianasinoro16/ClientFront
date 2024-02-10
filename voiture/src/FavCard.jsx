import React from 'react';
import './assets/dist/css/bootstrap.min.css';
import './assets/dist/js/bootstrap.bundle.min';
import './assets/fontawesome-5/css/all.min.css';
import './assets/fontawesome-5/css/all.css';
import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';

export default function FavCard({ image, prix, date, idFavoris, idvoiture, annonce, descs, lieu }) {
//   const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const deleteFavoris = async () => {
    try {
      const response = await fetch(`https://autooccasionpart2-production.up.railway.app/api/favoris/delete_favoris/${idFavoris}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('annonce non supprimée');
      }

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        console.log(data.message);
      } else {
        window.location.reload();
      }
    } catch (error) {
      console.error('Erreur :', error.message);
    }
  };

  const datepart = date.split('T')[0];

  return (
    <div className='col-md-3 mb-4'>
      <div className="card">
        <img src={image} alt='Produit' className='card-img-top img-fluid rounded' style={{height: "300px"}} />
        <div className='py-2' />
        <div className='card-body'>
          <h5 className='card-title h3'>Prix: {prix}</h5>
          <p className='card-text'>Date annonce: {datepart}</p>
          <p className='card-text'>Description: {descs}</p>
          <p className='card-text'>lieu: {lieu}</p>
          <Link to={`/detail?idVoiture=${encodeURIComponent(idvoiture)}&prix=${encodeURIComponent(prix)}&annonce=${encodeURIComponent(annonce)}&image=${encodeURIComponent(image)}`}>
            <button className='btn btn-success'>Je suis intéressé</button>
          </Link>
          <div className="py-1"></div>
          <button className='btn btn-danger' onClick={deleteFavoris}>
            <i className='fas fa-trash-alt'></i> retirer des favoris
          </button>
        </div>
      </div>
    </div>
  );
}
