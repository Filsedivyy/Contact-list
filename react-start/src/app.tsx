import ContactPanel from "./components/ContactPanel";
import AddNewContact from "./components/AddNewContact";
import ContactInfo from "./components/ContactInfo";
import { useState, useEffect } from "react";
import LandingPageComponent from "./components/LandingPage";
import EditComponent from "./components/EditComponent";

export interface ContactInfo {
  id: number;
  name: string;
  email: string;
  phone: number;
  created: Date;
}
export interface ContactFragment {
  id: number;
  name: string;
}
const App = () => {
  const [contactFragments, setContactFragments] = useState<ContactFragment[]>(
    []
  );
  const [contactInfo, setContactInfo] = useState<ContactInfo[]>([]);
  const [editing, setEditing] = useState(false);
  const [activeContactID, setActiveContactID] = useState(0);

  async function getContactInfo(id: number) {
    const response = await fetch(`http://localhost:7070/contact/${id}`, {
      method: "GET",
    });
    const data: ContactInfo[] = await response.json();
    setContactInfo(data);
    setActiveContactID(data.id);
  }

  function reloadData() {
    fetchContactFragments();
  }

  useEffect(() => {
    fetchContactFragments();
  }, []);

  async function fetchContactFragments() {
    const response = await fetch("http://localhost:7070/contact/id/name", {
      method: "GET",
    });
    const data: ContactFragment[] = await response.json();
    setContactFragments(data);
    if (data.length === 0) {
      setActiveContactID(0);
    } else {
      setActiveContactID(data[0].id);
      getContactInfo(data[0].id);
    }
  }

  async function deleteContact(id: number) {
    await fetch(`http://localhost:7070/delete/${id}`, {
      method: "DELETE",
    });
    setActiveContactID(contactFragments[0].id);
    reloadData();
  }

  return (
    <div className="flex flex-row">
      <ContactPanel
        contactFragments={contactFragments}
        setActiveContactID={setActiveContactID}
        ActiveContactID={activeContactID}
        getContactInfoFunc={getContactInfo}
      />

      {activeContactID == 0 && (
        <LandingPageComponent setActiveContactID={setActiveContactID} />
      )}

      {activeContactID > 0 &&
        (!editing ? (
          <ContactInfo
            contactInfo={contactInfo}
            activeContactID={activeContactID}
            deleteContact={deleteContact}
            editContact={() => setEditing(true)}
          />
        ) : (
          <EditComponent
            reloadDataFunc={reloadData}
            contactInfo={contactInfo}
            cancel={() => setEditing(false)}
            setActiveContactID={setActiveContactID}
            activeContactID={activeContactID}
            setEditing={setEditing}
          />
        ))}

      {activeContactID == -1 && (
        <AddNewContact
          cancel={() =>
            setActiveContactID(
              contactFragments.length === 0 ? 0 : contactFragments[0].id
            )
          }
        />
      )}
    </div>
  );
};

export default App;
