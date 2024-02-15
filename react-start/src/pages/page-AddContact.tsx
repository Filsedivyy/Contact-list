import ContactPanel from "../components/ContactPanel";
import AddNewContact from "../components/AddNewContact";
import "./style.css";
import { useState } from "react";

const AddContactPage = () => {
  const [contacts, updateContacts] = useState([]);

  function addContact(newContact) {
    updateContacts([...contacts, newContact]);
  }

  return (
    <div className="add-contact-page">
      <ContactPanel contacts={contacts} />
      <AddNewContact addContact={addContact} />
    </div>
  );
};

export default AddContactPage;
