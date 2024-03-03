import ContactPanel from "./components/ContactPanel";
import AddNewContact from "./components/AddNewContact";
import ContactInfo from "./components/ContactInfo";
import { useState } from "react";
import LandingPageComponent from "./components/LandingPage";
import EditComponent from "./components/EditComponent";
import { createContext, useState } from "react";


export const AppContext = createContext(0);

const App = () => {
  const [contacts, updateContacts] = useState([]);

  const [editing, setEditing] = useState(false);
  const [activeContactID, setActiveContactID] = useState(0);


  const test = "zkouška"


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
    <div className="flex flex-row">
      <ContactPanel
        contacts={contacts}
        setActiveContactID={setActiveContactID}
        ActiveContactID={activeContactID}
      />

      {contacts.length == 0 && activeContactID >= 0 && (
        <LandingPageComponent setActiveContactID={setActiveContactID} />
      )}

      {contacts.length > 0 &&
        activeContactID >= 0 &&
        (!editing ? (
          <AppContext.Provider value={test}>
            <ContactInfo
              contact={contacts.find((c) => c.id === activeContactID)}
              deleteContact={deleteContact}
              editContact={() => setEditing(true)}
            />
          </AppContext.Provider>
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
