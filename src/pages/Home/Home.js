import React from "react";
import "./Home.css";
import { MdLocalHospital } from "react-icons/md";
import { FaBaby, FaRibbon } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { GiBrain } from "react-icons/gi";

const Home = () => {
  return (
    <div className="container">
      {/* Header Section */}
      <div className="header-content">
        <a href="/">
          <img src="./assets/images/logo.png" alt="CHU Logo" className="logo" />
        </a>
        <a href="/login">
          <img
            src="./assets/images/login.png"
            alt="Profile"
            className="profile-icon"
          />
        </a>
      </div>
      <header className="header">
        <div className="hero">
          <h1 className="hero-title">
            Des compétences d'aujourd'hui qui ont de l'avenir
          </h1>
          <img
            src="./assets/images/nurse.png"
            alt="Nurse"
            className="hero-image"
          />
        </div>
      </header>

      {/* Main Section */}
      <main className="main">
        {/* Introduction Section */}
        <section className="intro-section">
          <h2>Savoir. Faire. Savoir-faire.</h2>
          <p>Avec CHU E-Learning, découvrez une nouvelle façon d'apprendre.</p>
          <div className="features">
            <div className="feature">
              <img
                src="./assets/images/learning-icon.png"
                alt="Learn Anywhere"
                className="feature-icon"
              />
              <p><strong>Apprenez où que vous soyez</strong></p>
            </div>
            <div className="feature">
              <img
                src="./assets/images/mentor-icon.png"
                alt="Mentor Support"
                className="feature-icon"
              />
              <p><strong>Un mentor pour vous accompagner</strong></p>
            </div>
          </div>
        </section>

        {/* Update Section */}
        <section className="update-section">
          <div className="update-text">
            <h3>
              Restez à Jour sur les Nouvelles Maladies : Une Formation Essentielle
              pour les Médecins
            </h3>
            <p>
              Mettez à jour vos connaissances, développez de nouvelles
              compétences, obtenez notre formation en ligne, dédiée aux
              médecins et au personnel hospitalier, vous offre les outils
              nécessaires pour comprendre et anticiper ces nouveaux défis.
            </p>
            <button className="button">Démarrer mon inscription</button>
          </div>
          <div>
            <iframe
              className="video"
              src="https://www.youtube.com/embed/zw-2OGb8m6A"
              title="Le CHU en Chiffres - centre hospitalier universitaire"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              /*allowFullScreen*/
            ></iframe>
          </div>
        </section>

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
            <h4 className="localisation-title" style={{color:'rgb(67, 136, 214)'}}>CHU Oujda</h4>
            <p>Qui nous-sommes?</p>
            <p>Qu’est-ce qu’on fait</p>
          </div>
          <div>
      <h4 style={{ color: "rgb(67, 136, 214)" }}>CONTACT</h4>
      <p>
        <MdEmail style={{ color: "rgba(15, 12, 12, 0.644)", marginRight: "8px" }} />
        Email: <a href="mailto:contact@chuoujda.ma" className="email">contact@chuoujda.ma</a>
      </p>
      <p>
        <FiPhone style={{ color: "rgba(15, 12, 12, 0.644)", marginRight: "8px" }} />
        Téléphone: +212 5 36 53 91 00
      </p>
    </div>
          <div>
            <h4 style={{color:'rgb(28, 114, 212)'}}>LOCALISATION DU CHU</h4>
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
