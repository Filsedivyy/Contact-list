import "./style-EditComponent.css";
import EditInputComponent from "./EditInputComponent";
import { useState } from "react";

const EditComponent = ({ contact, cancel }) => {
  const [fullName, setFullName] = useState(contact.fullName);
  const [email, setEmail] = useState(contact.email);
  const [phoneNum, setPhoneNum] = useState(contact.phoneNum);

  return (
    <div className="edit-component">
      <header>
        <h3> Upravit kontakt</h3>
        <button id="cancel" onClick={cancel}>
          Zrušit
        </button>
      </header>
      <main>
        <h1>Upravit kontakt</h1>
        <EditInputComponent
          label="Celé jméno"
          onChange={setFullName}
          value={fullName}
        />
        <EditInputComponent label="Email" onChange={setEmail} value={email} />
        <EditInputComponent
          label="Telefon"
          onChange={setPhoneNum}
          value={phoneNum}
        />
        <button className="save-changes">Uložit změny</button>
      </main>
    </div>
  );
};

export default EditComponent;
