import './chat.css';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBCardFooter,
  MDBIcon,
  MDBBtn,
} from 'mdb-react-ui-kit';
import { ScrollPanel } from 'primereact/scrollpanel';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function ChatRooms() {
  const [dataChat, setDataChat] = useState([]);
  // const [dataUser, setDataUser] = useState({});
  // const [myMail, setMyMail] = useState('');
  const location = useLocation();
  const param = new URLSearchParams(location.search);
  const userMessage = param.get('userMessage');
  const nav = useNavigate();
  // const token = localStorage.getItem('token');

  const back = () => {
    nav('/listcontact');
  };

  function formatDate(dateTimeString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
    const formattedDate = new Date(dateTimeString).toLocaleString('fr-FR', options);
    return formattedDate;
  }

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch('https://autooccasionpart2-production.up.railway.app/api/user/findToken', {
  //         method: 'GET',
  //         headers: {
  //           'Authorization': `Bearer ${token}`,
  //           'Content-type': 'application/json',
  //         },
  //       });

  //       if (!response.ok) {
  //         throw new Error('Données non récupérées');
  //       }

  //       const data = await response.json();
  //       // setDataUser(data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchData();
  // }, [token]);

  // useEffect(() => {
  //   const { email } = dataUser;
  //   // setMyMail(email);
  // }, [dataUser]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const encodedUsername = encodeURIComponent(userMessage);
        const response = await fetch(`https://autooccasionpart2-production.up.railway.app/api/chats/secondUserName/${encodedUsername}`, {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des messages');
        }

        const data = await response.json();
        setDataChat(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [userMessage]);


  return (
    <MDBContainer fluid className="py-3" style={{ width: '100%' }}>
      <MDBRow className="d-flex justify-content-center">
        <MDBCol md="12" xl="6">
          <MDBCard id="chat2" style={{ borderRadius: '15px' }}>
            <MDBCardHeader className="d-flex justify-content-between align-items-center p-3">
              <h5 className="mb-0">{userMessage}</h5>
              <MDBBtn color="success" size="sm" rippleColor="dark" onClick={back}>
                <MDBIcon fas icon="chevron-left" /> Retour vers mes contacts
              </MDBBtn>
            </MDBCardHeader>
            <ScrollPanel className="col-md-12" style={{ height: '650px' }}>
              <MDBCardBody>
              {dataChat.map((element) => (
                element.messageList.map((messages, index) => (
                  messages.senderEmail.localeCompare(userMessage) === 0 ? (
                    <div key={index} className="d-flex flex-row justify-content-start">
                      <div>
                        <p className="small p-2 ms-3 mb-1 rounded-3" style={{ backgroundColor: "#f5f6f7" }}>
                          {messages.replymessage}
                        </p>
                        <p className="small ms-3 mb-3 rounded-3 text-muted">
                          {formatDate(messages.time)}
                        </p>
                      </div>
                    </div>  
                  ) : (
                    <div key={index} className="d-flex flex-row justify-content-end mb-4">
                      <div>
                        <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-success">
                          {messages.replymessage}
                        </p>
                        <p className="small me-3 mb-3 rounded-3 text-muted d-flex justify-content-end">
                          {formatDate(messages.time)}
                        </p>
                      </div>
                    </div>
                  )
                ))
              ))}
              </MDBCardBody>
            </ScrollPanel>
            <MDBCardFooter className="text-muted d-flex justify-content-start align-items-center p-3">
              <input
                type="text"
                className="form-control form-control-lg"
                id="exampleFormControlInput1"
                placeholder="Type message"
              />
              <a className="ms-1 text-muted" href="#!">
                <MDBIcon fas icon="paperclip" />
              </a>
              <a className="ms-3 text-muted" href="#!">
                <MDBIcon fas icon="smile" />
              </a>
              <a className="ms-3" href="#!">
                <MDBIcon fas icon="paper-plane" />
              </a>
            </MDBCardFooter>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
