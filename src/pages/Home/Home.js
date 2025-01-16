
const Home = () => {
    
  return (
    <div style={styles.container}>
      {/* Header Section */}
      <div style={styles.headerContent}>
        <a href="/"><img
          src="./assets/images/logo.png"
          alt="CHU Logo"
          style={styles.logo}
        /></a>
        <a href="/login">
        <img
          src="./assets/images/login.png"
          alt="Profile"
          style={styles.profileIcon}
        />
        </a>
      </div>
      <header style={styles.header}>
        <div style={styles.hero}>
          <h1 style={styles.heroTitle}>Des compétences d'aujourd'hui qui ont de l'avenir</h1>
          <img
            src="./assets/images/nurse.png"
            alt="Nurse"
            style={styles.heroImage}
          />
        </div>
      </header>

      {/* Main Section */}
      <main style={styles.main}>
        {/* Introduction Section */}
        <section style={styles.introSection}>
          <h2>Savoir. Faire. Savoir-faire.</h2>
          <p>
            Avec CHU E-Learning, découvrez une nouvelle façon d'apprendre.
          </p>
          <div style={styles.features}>
            <div style={styles.feature}>
              <img
                src="./assets/images/learning-icon.png"
                alt="Learn Anywhere"
                style={styles.featureIcon}
              />
              <p>Apprenez où que vous soyez</p>
            </div>
            <div style={styles.feature}>
              <img
                src="./assets/images/mentor-icon.png"
                alt="Mentor Support"
                style={styles.featureIcon}
              />
              <p>Un mentor pour vous accompagner</p>
            </div>
          </div>
        </section>

        {/* Update Section */}
        <section style={styles.updateSection}>
          <div style={styles.updateText}>
            <h3>Restez à Jour sur les Nouvelles Maladies : Une Formation Essentielle pour les Médecins</h3>
            <p>
              Mettez à jour vos connaissances, développez de nouvelles compétences, obtenez notre formation en ligne,
              dédiée aux médecins et au personnel hospitalier, vous offre les outils nécessaires pour comprendre et
              anticiper ces nouveaux défis.
            </p>
            <button style={styles.button}>Démarrer mon inscription</button>
          </div>
          <div>
            <video
              src="path/to/video.mp4"
              controls
              style={styles.video}
            />
          </div>
        </section>

        {/* Hospitals Section */}
        <section style={styles.hospitalsSection}>
          <h2>Nos Hopitaux</h2>
          <div style={styles.hospitalsLinks}>
            <a href="/" onClick={(e) => e.preventDefault()}>Hôpital des spécialités</a>
            <a href="/" onClick={(e) => e.preventDefault()}>Hôpital mère et enfant</a>
            <a href="/" onClick={(e) => e.preventDefault()}>Centre d'oncologie Hassan II</a>
            <a href="/" onClick={(e) => e.preventDefault()}>Hôpital de la santé mentale</a>
          </div>

          <div style={styles.hospitalsDetails}>
            <div>
              <h3>CHU Oujda</h3>
              <p>Qui nous-sommes?</p>
              <p>Qu’est ce qu’on fait</p>
            </div>
            <div>
              <h3>Contact</h3>
              <p>Email: contact@chuoujda.ma</p>
              <p>Téléphone: +212 5 36 53 91 00</p>
            </div>
            <div>
              <h3>Localisation du CHU</h3>
              <img
                src="path/to/map.png"
                alt="Map"
                style={styles.map}
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
  },
  header: {
    paddingBottom:"0px",
    backgroundColor: "#f7f6ee",
    padding: "20px",
  },
  headerContent: {
    marginTop : "0px",
    padding:"10px",
    backgroundColor : "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    height: "50px",
  },
  profileIcon: {
    height: "40px",
    borderRadius: "50%",
    marginLeft : "12px"
  },
  hero: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "20px",
  },
  heroTitle: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#333",
    flex: 1,
  },
  heroImage: {
    margin:0,
    height: "400px",
    width: "auto",
    flex: 1,
  },
  main: {
    padding: "20px",
  },
  introSection: {
    textAlign: "center",
    marginBottom: "40px",
  },
  features: {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
  },
  feature: {
    textAlign: "center",
    margin: "0 20px",
  },
  featureIcon: {
    height: "150px",
    marginBottom: "10px",
  },
  updateSection: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
    paddingBottom: "0px",
    backgroundColor: "#f0f0f0",
    borderRadius: "8px",
    marginBottom: "40px",
  },
  updateText: {
    flex: 1,
    marginRight: "20px",
  },
  button: {
    backgroundColor: "#4a90e2",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  video: {
    flex: 1,
    height: "200px",
  },
  hospitalsSection: {
    textAlign: "center",
  },
  hospitalsLinks: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  hospitalsDetails: {
    display: "flex",
    justifyContent: "space-between",
    textAlign: "left",
  },
  map: {
    height: "100px",
  },
};

export default Home;
