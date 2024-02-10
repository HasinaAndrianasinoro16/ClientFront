import React, { useEffect, useState } from 'react';
import './assets/dist/css/bootstrap.min.css';
import './assets/dist/js/bootstrap.bundle.min';
import './assets/fontawesome-5/css/all.min.css';
import './assets/fontawesome-5/css/all.css';
import './chat.css';
import Bloc from './BlocContact';
import { Link } from 'react-router-dom';
import { ProgressSpinner } from 'primereact/progressspinner';

const ListContact = () => {
  const [liste, setListe] = useState([]);
  const [pseudos, setPseudos] = useState('');
  const [dataUser, setDataUser] = useState({});
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://autooccasionpart2-production.up.railway.app/api/user/findToken', {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des informations de l'utilisateur");
        }

        const data = await response.json();
        setDataUser(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [token]);

  useEffect(() => {
    const { nom } = dataUser;
    // setPseudos(nom + ' '+prenom);
    setPseudos(nom);
  }, [dataUser]);

  useEffect(() => {
    const fetchData = async () =>{
      try {
        const encodedUsername = encodeURIComponent(pseudos);
        const response = await fetch(`https://autooccasionpart2-production.up.railway.app/api/chats/firstUserName/${encodedUsername}`, {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error("Erreur lors de la recuperation des contacts");
        }

        const data = await response.json();
        setListe(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [pseudos, token]);

  if (!liste) {
    return (
      <div className="d-flex align-items-center justify-content-center vh-100">
      <div>
        <ProgressSpinner style={{ width: '50px', height: '100px' }} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />
      </div>
    </div>
  );
  }

  return (
    <div className="container">
      <h1 className="text-center">Liste de mes contacts:</h1>
      <div className="row">
        <div className="py-3"></div>
        {liste.map((ct, index) => (
    <Link key={ct.id || index} to={`/chatroom?userMessage=${encodeURIComponent(ct.secondUserName)}`} style={{ textDecoration: "none", color: "black" }}>
      <Bloc nom={ct.secondUserName} dernierMessage={ct.messageList[0].replymessage} />
    </Link>
  ))}
      </div>
    </div>
  );
};

export default ListContact;
