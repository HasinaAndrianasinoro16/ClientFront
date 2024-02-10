import React, { useState,useEffect } from 'react';
import Card from "./Card";
import { ScrollPanel } from 'primereact/scrollpanel';
import { ProgressSpinner } from 'primereact/progressspinner';
// import { Card } from 'react-bootstrap';

export default function Body() {
  const [minPrix, setMinPrix] = useState('');
  const [maxPrix, setMaxPrix] = useState('');
  const [annonce, setAnnonce] =  useState([]);
  const [annonceFiltre, setAnnonceFiltre] = useState([]);
  const [searchs, setSearchs] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try{
        const reponse = await fetch('https://autooccasionpart2-production.up.railway.app/api/annonce/annonces_validees');

        if(!reponse.ok) {
          throw new Error('Erreur lors de la recuperation des annonces');
        }

        const data = await reponse.json();
        setAnnonce(data);
        setAnnonceFiltre(data);

      }catch(error){
        console.error(error.message);
      }
    };
    fetchData();
  }, []);

  const search = async () =>{
    try {
      const reponse = await fetch(`https://autooccasionpart2-production.up.railway.app/api/detail/search/${searchs}`);

      if(!reponse.ok){
        throw new Error('Erreur lors de la recherche');
      }

      const data = await reponse.json();
      setAnnonce(data);
      setAnnonceFiltre(data);

    } catch (error) {
      console.error(error.message);
    }
    // window.location.reload();
  };


  const filtre = () =>{
    const filtred = annonce.filter(card => {
      const prix =card.prix;
      const mini = minPrix;
      const maxi = maxPrix;

      return prix >= mini && prix <= maxi;
    });
    setAnnonceFiltre(filtred);
  }

  if (!annonceFiltre) {
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
        <div className="container">
        <div className='text-center input-group'>
        <input type="text" className="form-control" onChange={(e) => setSearchs(e.target.value)} placeholder="Rechercher..." />
        <button type="button" className="btn btn-success" onClick={search} ><i className='fab fa-sistrix' ></i> search</button>
        </div>
        </div>
        <div className='py-3' ></div>
      <div className="col-md-3 text-center fixed">
          <h1>Filtrer</h1>
          <div className="form-floating mb-4">
            <input type="text" className="form-control" id="min" onChange={(e) => setMinPrix(e.target.value)} />
            <label htmlFor="min">Min Price</label>
          </div>
          <div className="form-floating mb-4">
            <input type="text" className="form-control" id="max" onChange={(e) => setMaxPrix(e.target.value)} />
            <label htmlFor="max">Max Price</label>
          </div>
          {/* <button className="btn btn-warning btn-block" onClick={Search}> */}
          <button onClick={filtre} className="btn btn-success btn-lg btn-block">
            Filter product
          </button>
        </div>
        <ScrollPanel className="col-md-9" style={{height:'100vh'}}>
          <h1 className="text-start">Annonce de voiture:</h1>
          <div className="row">
          {annonceFiltre.map(card => <Card key={card.idAnnonce} annonce={card.idAnnonce} idvoiture={card.idCar} prix={card.prix} date={card.date_annonce} image={card.image_car} lieu={card.lieu} descs={card.description} user={card.idUser} /> )}
          </div>
        </ScrollPanel>
      </div>
    </div>
  );
}

