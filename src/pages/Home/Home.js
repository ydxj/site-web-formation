import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";
import { MdLocalHospital } from "react-icons/md";
import { FaBaby, FaRibbon } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { GiBrain } from "react-icons/gi";
import { Carousel } from "react-bootstrap";
import EventsList from "../../components/layout/EventsList";
import EventDetails from "../../components/layout/EventDetails";

const Home = () => {
  const [username, setUsername] = useState("");
  const [events, setEvents] = useState([]);
  const [newsList, setNewsList] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [Role, setRole] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8081/events")
      .then((response) => setEvents(response.data))
      .catch((error) => console.error("Error fetching events:", error));

    const fetchUserRole = async () => {
      try {
        const response = await axios.get("http://localhost:8081/menu", {
          withCredentials: true,
        });
        if (response.data.valid) {
          setRole(response.data.role);
          setUsername(response.data.username);
        } else {
          console.log("Erreur");
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    };

    const fetchNews = async () => {
      try {
        const response = await axios.get("http://localhost:8081/get-news");
        setNewsList(response.data);

        // console.log(response.data);

        // console.log(response.data)

      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchUserRole();
    fetchNews();
  }, []);

  const handleEventClick = (event) => setSelectedEvent(event);
  const handleBack = () => setSelectedEvent(null);

  return (
    <div className="container1">
      {/* Header Section */}
      <div className="header-content">
        <a href="/">
          <img
            src="./assets/images/logo.png"
            alt="CHU Logo"
            className="logo"
          />
        </a>
        {username ? (
          <a href={Role === "admin" ? "/dashboard" : "/courses"}>
            <button className="Button-userName">{username[0]}</button>
          </a>
        ) : (
          <a href="/login">
            <img
              src="./assets/images/login.png"
              alt="Profile"
              className="profile-icon"
            />
          </a>
        )}
      </div>

      <header className="header">
        {events.length > 0 && (
          <Carousel className="container">
            {events.map((event, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100"
                  src={event.image}
                  alt={`Slide ${index + 1}`}
                  height="350px"
                />
                <Carousel.Caption
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    borderRadius: "10px",
                    padding: "10px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  <h5
                    style={{
                      color: "black",
                      fontWeight: "bold",
                      marginBottom: "5px",
                    }}
                  >
                    {event.title}
                  </h5>
                  <p style={{ color: "black", fontSize: "14px" }}>
                    {event.description}
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        )}
      </header>

      <main className="main">
        {/* ✅ Bienvenue Section ajoutée ici */}
        <div className="row justify-content-center mb-4">
          <div className="col-md-10 text-center">
            <div className="p-4 bg-light rounded shadow">
              <h2 className="text-primary mb-3">
                Bienvenue sur la plateforme de formation interne
              </h2>
              <p className="lead">
                Cette plateforme est dédiée à la gestion et au suivi des
                formations continues pour les professionnels de santé.
              </p>
            </div>
          </div>
        </div>

        {/* Update Section */}
        <div className="row queryM ">
          <div className="col-6 partsM">
            <div className="col-12">
              <div
                className="mb-5"
                style={{
                  backgroundColor: "#f9f9f9",
                  padding: "20px",
                  borderRadius: "15px",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                  maxWidth: "100%",
                  textAlign: "center",
                  fontFamily: "'Arial', sans-serif",
                }}
              >
                {selectedEvent ? (
                  <EventDetails event={selectedEvent} onBack={handleBack} />
                ) : (
                  <EventsList
                    events={newsList}
                    onEventClick={handleEventClick}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="row col-6 partsM">
            <div className="col-12">
              <section className="update-section">
                <div className="update-text">
                  <h3>
                    Restez à Jour sur les Nouvelles Maladies : Une Formation
                    Essentielle pour les Médecins
                  </h3>
                  <p>
                    Mettez à jour vos connaissances, développez de nouvelles
                    compétences, obtenez notre formation en ligne, dédiée aux
                    médecins et au personnel hospitalier, vous offre les outils
                    nécessaires pour comprendre et anticiper ces nouveaux
                    défis.
                  </p>
                  <a
                    className="button"
                    href="login"
                    style={{ textDecoration: "none" }}
                  >
                    Démarrer mon inscription
                  </a>
                </div>
                <div>
                  <iframe
                    className="video"
                    src="https://www.youtube.com/embed/zw-2OGb8m6A"
                    title="Le CHU en Chiffres - centre hospitalier universitaire"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  ></iframe>
                </div>
              </section>
            </div>
          </div>
        </div>

        {/* Hospitals Section */}
        <section className="hospitals-section">
          <h2>Nos Hôpitaux</h2>
          <div className="hospitals-links">
            <a
              href="http://www.chuoujda.ma/nos_hopitaux/hopital_des_specialites.html"
              className="hospital-button"
            >
              <MdLocalHospital className="icon" /> Hôpital des spécialités
            </a>
            <a
              href="http://www.chuoujda.ma/nos_hopitaux/hopital_mere_enfant.html"
              className="hospital-button"
            >
              <FaBaby className="icon" /> Hôpital mère et enfant
            </a>
            <a
              href="http://www.chuoujda.ma/nos_hopitaux/centre__oncologie_h2.html"
              className="hospital-button"
            >
              <FaRibbon className="icon" /> Centre d'oncologie Hassan II
            </a>
            <a
              href="http://www.chuoujda.ma/nos_hopitaux/hopital_sante_mentale.html"
              className="hospital-button"
            >
              <GiBrain className="icon" /> Hôpital de la santé mentale
            </a>
          </div>
        </section>

        <div className="hospitals-details">
          <div>
            <h4 className="localisation-title" style={{ color: "rgb(67, 136, 214)" }}>
              CHU Oujda
            </h4>
            <p>Qui nous-sommes?</p>
            <p>Qu’est-ce qu’on fait</p>
          </div>
          <div>
            <h4 style={{ color: "rgb(67, 136, 214)" }}>CONTACT</h4>
            <p>
              <MdEmail
                style={{
                  color: "rgba(15, 12, 12, 0.644)",
                  marginRight: "8px",
                }}
              />
              Email:{" "}
              <a href="mailto:contact@chuoujda.ma" className="email">
                contact@chuoujda.ma
              </a>
            </p>
            <p>
              <FiPhone
                style={{
                  color: "rgba(15, 12, 12, 0.644)",
                  marginRight: "8px",
                }}
              />
              Téléphone: +212 5 36 53 91 00
            </p>
          </div>
          <div>
            <h4 style={{ color: "rgb(28, 114, 212)" }}>LOCALISATION DU CHU</h4>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d52511.03187619542!2d-1.910535!3d34.656231!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x6c8a1da16bc171e1!2sCentre%20Hospitalier%20Universitaire%20Mohammed%20VI!5e0!3m2!1sfr!2sma!4v1576061269449!5m2!1sfr!2sma"
              width="250"
              height="250"
              frameBorder="0"
              style={{ border: 0 }}
              allowFullScreen
              title="Location of Centre Hospitalier Universitaire Mohammed VI"
            ></iframe>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
