
import './assets/style/styles.css'
import './assets/style/message.css'
import './assets/dist/css/bootstrap.min.css';
import './assets/dist/js/bootstrap.bundle.min';
import './assets/fontawesome-5/css/all.min.css';
import './assets/fontawesome-5/css/all.css';

import user from './assets/img/ordi.jpg'
import Datamessage from "./Datamessage"
import { useState } from "react";
import Header from './Header';
function Message() {
    const [choix, setChoix] = useState(1);
    const [data, setData] = useState(<Datamessage key={choix} idpersonne={choix} />);

    function writeMessage() {
        const div_message = document.querySelector('.messaging');
        const content_my_message = document.createElement('div');
        content_my_message.className = "me_boite";
        const span_message = document.createElement('span');
        const input_message = document.querySelector('input[type="text"]');
        span_message.innerHTML = input_message.value;
        span_message.className = "me";
        content_my_message.appendChild(span_message);
        div_message.appendChild(content_my_message);
        input_message.value = "";
    }
    const handleClick = (idpersonne) => {
        setChoix(idpersonne);
        setData(<Datamessage key={idpersonne} idpersonne={idpersonne} />)
    }
    return (
        <>
        {/* <Header></Header> */}
        <div className="content-data">
            <div className="content-message">
                <div className="person">
                    <h1>Discussion</h1>
                    <div onClick={() => handleClick(3)}>
                        <img src={user} alt="" />
                        <span>Miaro Ramanantsoa</span>
                    </div>
                    <div onClick={() => handleClick(2)}>
                        <img src={user} alt="" />
                        <span>Mirado Mamiarivony</span>
                    </div>
                    <div onClick={() => handleClick(1)}>
                        <img src={user} alt="" />
                        <span>Tafita Anael</span>
                    </div>
                </div>
                <div className="message">
                    {data}
                    <div className="send">
                        <input type="text" name="message" placeholder="votre message" />
                        <button type="submit" className='btn btn-success' onClick={writeMessage}><i className='fas fa-paper-plane' ></i> Envoyer</button>
                        {/* <input type="submit" className='btn btn-success' value="envoyer" onClick={writeMessage} /> */}
                    </div>
                </div>
            </div>
            {/* <Footer /> */}
        </div>
        </>
    );
}

export default Message;
