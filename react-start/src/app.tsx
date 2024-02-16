import ContactPanel from "./components/ContactPanel";
import AddNewContact from "./components/AddNewContact";
import ContactInfo from "./components/ContactInfo";
import "./style.css";
import { useState } from "react";
import LandingPageComponent from "./components/LandingPage";

const App = () => {
  const [contacts, updateContacts] = useState([]);

  const [activeContactID, setActiveContactID] = useState(-1);

  function addContact(newContact) {
    updateContacts([...contacts, newContact]);
  }

  return (
    <div className="add-contact-page">
      <ContactPanel
        contacts={contacts}
        setActiveContactID={setActiveContactID}
      />
      {activeContactID >= 0 ? (
        <ContactInfo contact={contacts.find((c) => c.id == activeContactID)} />
      ) : activeContactID === -1 ? (
        <LandingPageComponent setActiveContactID={setActiveContactID} />
      ) : (
        <AddNewContact addContact={addContact} />
      )}
    </div>
  );
};

export default App;
