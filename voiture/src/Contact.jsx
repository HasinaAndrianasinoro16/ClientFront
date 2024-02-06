import React from 'react';
import './assets/dist/css/bootstrap.min.css';
import './assets/dist/js/bootstrap.bundle.min';
import './assets/fontawesome-5/css/all.min.css';
import './assets/fontawesome-5/css/all.css';

const Contact = ({ nom, dernierMessage, onClick }) => {
    return (
      <div className="contact" onClick={onClick}>
        <h5>{nom}</h5>
        <p>{dernierMessage}</p>
      </div>
    );
  };
  
  export default Contact;
