import ContactPanel from "./components/ContactPanel";
import AddNewContact from "./components/AddNewContact";
import ContactInfo from "./components/ContactInfo";
import "./style.css";
import { useState } from "react";
import LandingPageComponent from "./components/LandingPage";
import EditComponent from "./components/EditComponent";

const App = () => {
  const [contacts, updateContacts] = useState([]);

  const [activeContactID, setActiveContactID] = useState(-1);

  function addContact(newContact) {
    updateContacts([...contacts, newContact]);
  }

  function cancelButton(idecko) {
    setActiveContactID(contacts.length ? contacts[idecko].id : -1);
  }

  function deleteContact(idecko) {
    const updatedContacts = contacts.filter(
      (oneContact) => oneContact.id !== idecko
    );
    if (updatedContacts.length < contacts.length) {
      let newActiveContactID = -1;
      if (updatedContacts.length > 0) {
        newActiveContactID = updatedContacts[0].id;
      }
      setActiveContactID(newActiveContactID);
      updateContacts(updatedContacts);
    }
  }

  function editContact(idecko) {
    const contactToEdit = contacts.find((contact) => contact.id === idecko);
    setActiveContactID(-3);
  }

  return (
    <div className="add-contact-page">
      <ContactPanel
        contacts={contacts}
        setActiveContactID={setActiveContactID}
      />
      {activeContactID >= 0 ? (
        <ContactInfo
          contact={contacts.find((c) => c.id === activeContactID)}
          deleteContact={deleteContact}
          editContact={editContact}
        />
      ) : activeContactID === -1 ? (
        <LandingPageComponent setActiveContactID={setActiveContactID} />
      ) : activeContactID === -3 ? (
        <EditComponent cancelButton={cancelButton} />
      ) : (
        <AddNewContact addContact={addContact} cancelButton={cancelButton} />
      )}
    </div>
  );
};

export default App;
