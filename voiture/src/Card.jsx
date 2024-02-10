// import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './assets/dist/css/bootstrap.min.css';
import './assets/dist/js/bootstrap.bundle.min';
import './assets/fontawesome-5/css/all.min.css';
import './assets/fontawesome-5/css/all.css';


export default function Card({annonce,idvoiture,prix,date,image,lieu,descs,user}) {
    const token = localStorage.getItem('token');
    const datePart = date.split('T')[0];
    const nav = useNavigate();
    
    const addFavoris = async () => {
        try {
            const response = await fetch(`https://autooccasionpart2-production.up.railway.app/api/favoris/create_favoris/${annonce}`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
    
            if (!response.ok) {
                throw new Error('annonce non ajoutée au favoris');
            }

            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
              const data = await response.json();
              console.log(data.message);
            } else {
                nav('/favoris');
            }
            
        } catch (error) {
            console.error(error.message);
        }
    };
    

    if(token == null){
        return(
            <div className='col-md-4 mb-4'>
            <div className="card">
                <img src={image} alt="" className='card-img-top img-fluid rounded' />
                <div className='py-2' />
                <div className='card-body'>
                    <h5 className='card-title h3'>Prix: {prix}Ar</h5>
                    <p className='card-text'>Date annonce: {datePart}</p>
                    <p className='card-text'>Description: {descs}</p>
                    <p className='card-text'>lieu: {lieu}</p>
                    <Link to={`/detail?idVoiture=${encodeURIComponent(idvoiture)}&prix=${encodeURIComponent(prix)}&annonce=${encodeURIComponent(annonce)}&image=${encodeURIComponent(image)}&user=${encodeURIComponent(user)}`}><button className='btn btn-success' >Je suis interresser</button></Link>
                </div>
            </div>
        </div>
        );
    }

    // const addfav = 
    
    return (
        <div className='col-md-4 mb-4'>
            <div className="card">
                <img src={image} alt=" " className='card-img-top img-fluid rounded' style={{height: "300px"}} />
                <div className='py-2' />
                <div className='card-body'>
                    <h5 className='card-title h3'>Prix: {prix}Ar</h5>
                    <p className='card-text'>Date annonce: {datePart}</p>
                    <p className='card-text'>Description: {descs}</p>
                    <p className='card-text'>lieu: {lieu}</p>
                    <p className='card-text'>Ajouter au favoris: <i className='fas fa-heart btn-rounded btn btn-outline-danger' id='fav' onClick={addFavoris} ></i> </p>
                    <Link to={`/detail?idVoiture=${encodeURIComponent(idvoiture)}&prix=${encodeURIComponent(prix)}&annonce=${encodeURIComponent(annonce)}&image=${encodeURIComponent(image)}&user=${encodeURIComponent(user)}`}><button className='btn btn-success' >Je suis interresser</button></Link>
                </div>
            </div>
        </div>
    );
}
