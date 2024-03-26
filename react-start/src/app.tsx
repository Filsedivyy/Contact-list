import ContactPanel from "./components/ContactPanel";
import AddNewContact from "./components/AddNewContact";
import ContactInfo from "./components/ContactInfo";
import { createContext, useState, useEffect } from "react";
import LandingPageComponent from "./components/LandingPage";
import EditComponent from "./components/EditComponent";

export const AppContext = createContext(undefined);

export interface Contact {
  id: number;
  name: string;
  email: string;
  phone: number;
  created: Date;
}

const App = () => {
  const [contacts, updateContacts] = useState<Contact[]>([]);

  const [editing, setEditing] = useState(false);
  const [activeContactID, setActiveContactID] = useState(0);

  useEffect(() => {
    fetchContacts();
  }, []);

  async function fetchContacts() {
    const response = await fetch("http://localhost:7070/contacts", {
      method: "GET",
    });
    const data: Contact[] = await response.json();
    updateContacts(data);

    setActiveContactID(data[0].id);
  }

  async function deleteContact(id: number) {
    await fetch(`http://localhost:7070/delete/${id}`, {
      method: "DELETE",
    });
    setActiveContactID(contacts[0].id);
    window.location.reload();
  }

  return (
    <div className="flex flex-row">
      <ContactPanel
        setActiveContactID={setActiveContactID}
        ActiveContactID={activeContactID}
      />

      {activeContactID == 0 && (
        <LandingPageComponent setActiveContactID={setActiveContactID} />
      )}

      {activeContactID > 0 &&
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
              setActiveContactID={setActiveContactID}
              activeContactID={activeContactID}
              setEditing={setEditing}
            />
          </AppContext.Provider>
        ))}

      {activeContactID == -1 && (
        <AddNewContact
          cancel={() =>
            setActiveContactID(contacts.length === 0 ? 0 : contacts[0].id)
          }
        />
      )}
    </div>
  );
};

export default App;
