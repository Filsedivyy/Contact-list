import ContactPanel from "./components/ContactPanel";
import AddNewContact from "./components/AddNewContact";
import ContactInfo from "./components/ContactInfo";
import { createContext, useState, useEffect } from "react";
import LandingPageComponent from "./components/LandingPage";
import EditComponent from "./components/EditComponent";

export const AppContext = createContext(undefined);

export interface ContactFragment {
  id: number;
  name: string;
}

export interface Contact{
  id: number;
  name: string;
  email: string;
  phone: number;
  created: TimeRanges;
}


const App = () => {
  const [contact, updateContacts] = useState([]);

  const [editing, setEditing] = useState(false);
  const [activeContactID, setActiveContactID] = useState(0);

  const [contacts, setContacts] = useState<ContactFragment[]>([]);

  useEffect(() => {
    fetchContacts();
  }, []);
async function fetchContacts(){
  const response = await fetch("http://localhost:7070/contacts", {method: "GET"});
  const data: Contact[] = await response.json();
  setContacts(data);
}
// console.log(contacts)

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
  /*
  function findActiveContact() {
    return contacts.find((c) => c.id == activeContactID);
  }
  */
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
          <AppContext.Provider value={contacts}>
            <ContactInfo
              activeContactID={activeContactID}
              deleteContact={deleteContact}
              editContact={() => setEditing(true)}
            />
          </AppContext.Provider>
        ) : (
          <AppContext.Provider value={contacts}>
            <EditComponent
              cancel={() => setEditing(false)}
              editContact={editedContact}
              setActiveContactID={setActiveContactID}
              activeContactID={activeContactID}
              setEditing={setEditing}
            />
          </AppContext.Provider>
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
