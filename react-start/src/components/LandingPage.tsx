import "./style-LandingPage.css";

const LandingPageComponent = ({ setActiveContactID }) => {
  return (
    <div className="landing-page">
      <h2>Žádné kontakty</h2>
      <p>V listu momentálně nejsou žádné kontakty. Přidejte nějaký.</p>
      <button onClick={() => setActiveContactID(-2)}>Přidat kontakt</button>
    </div>
  );
};
export default LandingPageComponent;
