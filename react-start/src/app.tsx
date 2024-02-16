import ContactPanel from "./components/ContactPanel";
import AddNewContact from "./components/AddNewContact";
import ContactInfo from "./components/ContactInfo";
import "./style.css";
import { useState } from "react";

const App = () => {
  const [contacts, updateContacts] = useState([
    {
      id: 1,
      fullName: "Filip Šedivý",
      email: "fsedivy2000@seznam.cz",
      phoneNum: "721955908",
    },
  ]);

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
      ) : (
        <AddNewContact addContact={addContact} />
      )}
    </div>
  );
};

export default App;
