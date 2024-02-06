import React from 'react';
import './assets/dist/css/bootstrap.min.css';
import './assets/dist/js/bootstrap.bundle.min';
import './assets/fontawesome-5/css/all.min.css';
import './assets/fontawesome-5/css/all.css';
import { Link } from 'react-router-dom';

export default function FavCard({image, prix,date, idvoiture,annonce,descs,lieu}) {
const datepart = date.split('T')[0];
    return (
        <div className='col-md-3 mb-4'>
            <div className="card">
                <img src={image} alt='Produit' className='card-img-top img-fluid rounded' />
                <div className='py-2' />
                <div className='card-body'>
                    <h5 className='card-title h3'>Prix: {prix}</h5>
                    <p className='card-text'>Date annonce: {datepart}</p>
                    <p className='card-text'>Description: {descs}</p>
                    <p className='card-text'>lieu: {lieu}</p>
                    <Link to={`/detail?idVoiture=${encodeURIComponent(idvoiture)}&prix=${encodeURIComponent(prix)}&annonce=${encodeURIComponent(annonce)}`}><button className='btn btn-success' >Je suis interresser</button></Link>
                    <button className='btn btn-danger'><i className='fas fa-trash-alt' ></i> retirer des favoris</button>
                </div>
            </div>
        </div>
    );
}
