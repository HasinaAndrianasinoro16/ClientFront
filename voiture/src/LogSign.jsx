import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Toast } from 'primereact/toast';

export default function LogSign() {
  const navigate = useNavigate();
  const toast = useRef(null);
  const [email, setEmail] = useState('Doom@strangerthings.com');
  const [mdp, setMdp] = useState('Doom');
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');
  const [dataUser, setDataUser] = useState([]);
  const [pseudos, setPseudos] = useState([]);

  const showError = () => {
    toast.current.show({
      severity: 'error',
      summary: 'Erreur de connexion',
      detail: 'Adresse e-mail ou mot de passe incorrect',
      life: 3000,
    });
  };

  const deleteToken = () => {
    toast.current.show({
      severity: 'warning',
      summary: 'session expire',
      detail: 'votre session a expire veuillez vous reconnecter',
      life: 3000,
    });
  };

  const login = async (e) => {
    e.preventDefault(); // prevent default form submission

    try {
      setLoading(true);

      const reponse = await fetch('https://autooccasionpart2-production.up.railway.app/api/user/verif', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ email, mdp }),
      });

      if(localStorage.getItem('token')){
        navigate('/listcontact');
      }

      if (reponse.ok) {
        const token = await reponse.text();
        console.log(token);

        localStorage.setItem('token', token);

        // const data = await

        setTimeout(() => {
          localStorage.removeItem('token');
          deleteToken();
        }, 20 * 60 * 1000); // la session expire donc après 20 minutes
        navigate('/listcontact');
        window.location.reload();
      } else {
        showError();
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

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
    const fetchData = async () => {
      try {
        const reponse = await fetch('https://autooccasionpart2-production.up.railway.app/api/user_chat/add', {
          method: 'POST',
          headers:{
            'Content-type': 'application/json',
          },
          body: JSON.stringify({userName : pseudos}),
        });
        console.log('Server response:', reponse);
    
        if (!reponse.ok) {
          const errorText = await reponse.text();
          console.error(`Error (${reponse.status}): ${errorText}`);
          throw new Error('Erreur lors de la creation de la commission');
        }
    
        const data = await reponse.json();
        console.log('Server data:', data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  });


  return (
    <>
      <Toast ref={toast} position="top-center" />
      <div className="container col-xl-10 col-xxl-8 px-4 py-5">
        <div className="row align-items-center g-lg-5 py-5">
          <div className="col-lg-7 text-center text-lg-start">
            <h1 className="display-4 fw-bold lh-1 mb-3">CarReflexe</h1>
            <p className="col-lg-10 fs-4">
              Bienvenue sur CarReflexe, Trouvez la Voiture de Vos Rêves : Explorez notre sélection exceptionnelle de voitures d'occasion certifiées, toutes prêtes à vous offrir une expérience de conduite inoubliable. Parcourez notre showroom virtuel et trouvez la voiture d'occasion parfaite qui combine performance, style et fiabilité.
            </p>
          </div>
          <div className="col-md-10 mx-auto col-lg-5">
            <form className="p-4 p-md-5 border rounded-3 bg-light" onSubmit={login}>
              <div className="text-center h2">Log in</div>
              <div className="py-3"></div>
              <div className="form-floating mb-3 col-12">
                <input type="email" className="form-control" style={{ height: "60px" }} id="floatingInput" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" />
                <label htmlFor="floatingInput">Email address</label>
              </div>
              <div className="py-3"></div>
              <div className="form-floating mb-3">
                <input type="password" className="form-control" style={{ height: "60px" }} id="floatingPassword" value={mdp} onChange={(e) => setMdp(e.target.value)} placeholder="Password" />
                <label htmlFor="floatingPassword">Password</label>
              </div>
              <div className="py-2"></div>
              <button className="w-100 btn btn-lg btn-success" type="submit" disabled={loading}>
                {loading ? 'Logging in...' : 'Log in'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
