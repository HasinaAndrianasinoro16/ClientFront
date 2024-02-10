import React from 'react';
import './assets/dist/css/bootstrap.min.css';
import './assets/dist/js/bootstrap.bundle.min';
import './assets/fontawesome-5/css/all.min.css';
import './assets/fontawesome-5/css/all.css';
import './chat.css';

const Bloc = ({ nom, dernierMessage}) => {
    return (
        <div className="message-box">
        <p><strong>{nom}</strong></p>
        <p>{dernierMessage}</p>
      </div>
    );
  };
  
  export default Bloc;
