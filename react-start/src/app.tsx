import ContactPanel from "./components/ContactPanel";
import ContactInfo from "./components/ContactInfo";
import AddNewContact from "./components/AddNewContact";
import AddValueInput from "./components/AddValueInput";
import "./style.css";
import { useState } from "react";

const App = () => {
  const [contacts, updateContacts] = useState([]);

  function addContact(newContact) {
    updateContacts([...contacts, newContact]);
  }

  return (
    <div className="landing-page">
      <ContactPanel contacts={contacts} />
      <AddNewContact addContact={addContact} />
    </div>
  );
};

export default App;
