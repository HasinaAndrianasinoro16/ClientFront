import React from 'react';
import './assets/dist/css/bootstrap.min.css';
import './assets/dist/js/bootstrap.bundle.min';
import './assets/fontawesome-5/css/all.min.css';
import './assets/fontawesome-5/css/all.css';


export default function HtCard({prix, date,image}) {
    const datePart = date.split('T')[0];
    return (
        <div className='col-md-3 mb-4'>
            <div className="card">
                <img src={image} alt="" className='card-img-top img-fluid rounded' style={{height: "300px"}} />
                <div className='py-2' />
                <div className='card-body'>
                    <h5 className='card-title'>Prix:{prix} </h5>
                    <p className='card-text'>Date Annonce: {datePart} </p>
                </div>
            </div>
        </div>
    );
}
