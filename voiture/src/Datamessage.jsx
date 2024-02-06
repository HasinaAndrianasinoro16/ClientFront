import { useEffect, useState } from 'react';
import user from './assets/img/ordi.jpg';
import './assets/style/message.css'

function Datamessage({ idpersonne }) {
  const [person, setPersonne] = useState({ id: '', names: '', firstnames: '' });
  const [Message, setMessage] = useState([{ for_who: '', mp: '' }]);

  useEffect(() => {
    if (idpersonne === 1) {
      setPersonne({ id: 1, names: "Jean", firstnames: "Anael" });
      setMessage([{ for_who: "1", mp: "salut" }, { for_who: "0", mp: "salut" }]);
    }
    if (idpersonne === 2) {
      setPersonne({ id: 2, names: "Gregoire", firstnames: "latouche" });
      setMessage([{ for_who: "1", mp: "Miradooooooo" }, { for_who: "0", mp: "popopopopo" } , {for_who : "0" , mp:"Zay lesy eh"},{ for_who: "1", mp: "Aiza no fotoana . 20M fmg zany an" } , {for_who : "0" , mp:"Ambondrona ok @8h"}]);
    }
    if (idpersonne === 3) {
      setPersonne({ id: 3, names: "Ducobu", firstnames: "gratin" });
      setMessage([{ for_who: "1", mp: "salut" }, { for_who: "0", mp: "salut" }]);
    }
  }, [idpersonne]);

  return (
    <div className="data">
      <div className="content-persone">
        <img src={user} alt="" />
        <span className="name">{`${person.names} ${person.firstnames} `}</span>
      </div>
      <div className="messaging">
        {Message.map((element, items) => (
          element.for_who === "1" ? 
            <div key={items} className='boite_annonceur'>
                <span className='annonceur'>{element.mp}</span>
            </div> 
            : 
            <div key={items} className='me_boite'>
                <span className='me'>{element.mp}</span>
            </div>
        ))}
      </div>
    </div>
  );
}

export default Datamessage;
