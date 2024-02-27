import "./style-ContactInfo.css";
import InfoComponent from "./InfoComponent";

const ContactInfo = ({ contact, deleteContact, editContact }) => {
  return (
    <div className="contact-info">
      <header>
        <div className="placeholder"></div>
        <h2>{contact.fullName}</h2>
        <div className="button-container">
          <button onClick={() => deleteContact(contact.id)}>
            <img src="./delete.svg" alt="" />
          </button>
          <button onClick={() => editContact(contact.id)}>
            <img src="./edit.svg" alt="" />
          </button>
        </div>
      </header>
      <main>
        <h1>{contact.fullName}</h1>
        <InfoComponent img={"email.svg"} type={"Email"} value={contact.email} />
        <InfoComponent
          img={"phone.svg"}
          type={"Telefon"}
          value={contact.phoneNum}
        />
      </main>
    </div>
  );
};

export default ContactInfo;
