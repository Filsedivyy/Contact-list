import ContactPanel from "./components/ContactPanel";
import AddNewContact from "./components/AddNewContact";
import ContactInfo from "./components/ContactInfo";
import { useState } from "react";
import LandingPageComponent from "./components/LandingPage";
import EditComponent from "./components/EditComponent";

const App = () => {
  const [contacts, updateContacts] = useState([]);

  const [editing, setEditing] = useState(false);
  const [activeContactID, setActiveContactID] = useState(0);

  function addContact(newContact) {
    updateContacts([...contacts, newContact]);
  }

  function editedContact(contact) {
    updateContacts(contact);
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

  return (
    <div className="add-contact-page">
      <ContactPanel
        contacts={contacts}
        setActiveContactID={setActiveContactID}
      />

      {contacts.length == 0 && activeContactID >= 0 && (
        <LandingPageComponent setActiveContactID={setActiveContactID} />
      )}

      {contacts.length > 0 &&
        activeContactID >= 0 &&
        (!editing ? (
          <ContactInfo
            contact={contacts.find((c) => c.id === activeContactID)}
            deleteContact={deleteContact}
            editContact={() => setEditing(true)}
          />
        ) : (
          <EditComponent
            contact={contacts.find((c) => c.id == activeContactID)}
            cancel={() => setEditing(false)}
            contacts={contacts}
            editContact={editedContact}
            setActiveContactID={setActiveContactID}
            setEditing={setEditing}
          />
        ))}

      {activeContactID == -1 && (
        <AddNewContact
          addContact={addContact}
          cancel={() =>
            setActiveContactID(contacts.length === 0 ? 0 : contacts[0].id)
          }
        />
      )}
    </div>
  );
};

export default App;
