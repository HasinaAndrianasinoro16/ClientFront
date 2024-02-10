import React, { useState, useEffect } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import './assets/dist/css/bootstrap.min.css';
import './assets/dist/js/bootstrap.bundle.min';
import './assets/fontawesome-5/css/all.min.css';
import './assets/fontawesome-5/css/all.css';
import { ProgressSpinner } from 'primereact/progressspinner';


export default function Detail() {
    const [voitureDetails, setVoitureDetails] = useState(null);
    const loc = useLocation();
    const nav = useNavigate();
    const parameter = new URLSearchParams(loc.search);
    const idVoiture = parameter.get('idVoiture');
    const prix = parameter.get('prix');
    const sary = parameter.get('image');
    // const user = parameter.get('user');
    const token = localStorage.getItem('token');
    
    // const idAnnonce = parameter.get('annonce');

    const  message = async () =>{
      if(token != null){
        nav('/listContact');
      }else{
        nav('/log');
      }
    }

    useEffect(() => {
        const fetchData = async () =>{
            try {
                const reponse = await fetch(`https://autooccasionpart2-production.up.railway.app/api/voiture/findOne/${idVoiture}`);

                if(!reponse.ok){
                    throw new Error('Erreur lors de la recuperation des details');
                }
                const data = await reponse.json();
                setVoitureDetails(data);
            } catch (error) {
                console.error(error.message);
            }
        };
        fetchData();
    }, [idVoiture]);

    if (!voitureDetails) {
        return (
          <div className="d-flex align-items-center justify-content-center vh-100">
          <div>
            <ProgressSpinner style={{ width: '50px', height: '100px' }} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />
          </div>
        </div>
      );
      }

    return (
        <div className='container-lg'>
        <div className="row p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center">
        <div className="col-lg-7 p-3 p-lg-5 pt-lg-3">
          <h1 className="display-4 fw-bold lh-1">{voitureDetails.nom_voiture}</h1>
          <p className="lead">{voitureDetails.description_annonce}.</p>
          <div className='py-4' ></div>
          <table className=' table table-responsive table-stripped' >
            <thead>
                <th>marque:</th>
                <th className='text-end text-secondary'>{voitureDetails.marque_voiture.marque}</th>
            </thead>
            <tbody><tr><td></td><td></td></tr></tbody>
          </table>
          <div className='py-2' ></div>
          <table className=' table table-responsive table-stripped' >
            <thead>
                <th>Modele:</th>
                <th className='text-end text-secondary'>{voitureDetails.detail.modele}</th>
            </thead>
            <tbody><tr><td></td><td></td></tr></tbody>
          </table>
          <div className='py-2' ></div>
          <table className=' table table-responsive table-stripped' >
            <thead>
                <th>nombre de porte:</th>
                <th className='text-end text-secondary'>{voitureDetails.detail.nbr_portes}</th>
            </thead>
            <tbody><tr><td></td><td></td></tr></tbody>
          </table>
          <div className='py-2' ></div>
          <table className='table table-responsive table-stripped' >
            <thead>
                <th>annee de mise en circulation</th>
                <th className='text-end text-secondary' >{voitureDetails.detail.annee}</th>
            </thead>
            <tbody><tr><td></td><td></td></tr></tbody>
          </table>
          <div className='py-2' ></div>
          <table className='table table-responsive table-stripped' >
            <thead>
                <th>Boite de vitesse</th>
                <th className='text-end text-secondary' >{voitureDetails.detail.boite_devitesse}</th>
            </thead>
            <tbody><tr><td></td><td></td></tr></tbody>
          </table>
          <div className='py-2' ></div>
          <table className='table table-responsive table-stripped' >
            <thead>
                <th>Moteur</th>
                <th className='text-end text-secondary' >{voitureDetails.detail.source_energie}</th>
            </thead>
            <tbody><tr><td></td><td></td></tr></tbody>
          </table>
          <div className='py-2' ></div>
          <table className='table table-responsive table-stripped' >
            <thead>
                <th>couleur</th>
                <th className='text-end text-secondary' >{voitureDetails.detail.couleur}</th>
            </thead>
            <tbody><tr><td></td><td></td></tr></tbody>
          </table>
          <div className='py-2' ></div>
          <table className='table table-responsive table-stripped' >
            <thead>
                <th>Prix</th>
                <th className='text-end text-secondary' >{prix}</th>
            </thead>
            <tbody><tr><td></td><td></td></tr></tbody>
          </table>
          <div className='py-2' ></div>
          <div className="d-grid gap-2 d-md-flex justify-content-md-start mb-4 mb-lg-3">
            <button type="button" className="btn btn-success btn-lg px-4 me-md-2 fw-bold"><i className='fas fa-shopping-cart' ></i> Achter la voiture</button>
            <button type="button" className="btn btn-primary btn-lg px-4 me-md-2 fw-bold" onClick={message} ><i className='fab fa-facebook-messenger' ></i> contacter proprietaire</button>
          </div>
        </div>
        <div className="col-lg-4 offset-lg-1 p-0 overflow-hidden">
            <img className="rounded-lg-3" src={sary} alt="" width="720"/>
        </div>
      </div>
      </div>
    );
}
