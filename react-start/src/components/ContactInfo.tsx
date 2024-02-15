import "./style-ContactInfo.css";
import InfoComponent from "./InfoComponent";

const ContactInfo = ({
  fullName = "John Doe",
  emailValue = "test@seznam.cz",
  phoneNum = "721955908",
}) => {
  return (
    <div className="contact-info">
      <header>
        <div className="placeholder"></div>
        <h2>{fullName}</h2>
        <div className="button-container">
          <button>
            <img src="./delete.svg" alt="" />
          </button>
          <button>
            <img src="./edit.svg" alt="" />
          </button>
        </div>
      </header>
      <main>
        <h1>{fullName}</h1>
        <InfoComponent img={"email.svg"} type={"Email"} value={emailValue} />
        <InfoComponent img={"phone.svg"} type={"Telefon"} value={phoneNum} />
      </main>
    </div>
  );
};

export default ContactInfo;
