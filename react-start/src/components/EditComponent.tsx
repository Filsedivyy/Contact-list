import "./style-EditComponent.css";
import EditInputComponent from "./EditInputComponent";
import { useState } from "react";

const EditComponent = ({
  contact,
  cancel,
  editContact,
  contacts,
  setActiveContactID,
  setEditing,
}) => {
  const [fullName, setFullName] = useState(contact.fullName);
  const [email, setEmail] = useState(contact.email);
  const [phoneNum, setPhoneNum] = useState(contact.phoneNum);

  function saveEdit() {
    if (fullName.length === 0 || email.length === 0 || phoneNum.length === 0) {
      console.log(
        "Nelze vytvořit kontakt, protože některá z hodnot je prázdná."
      );
      return;
    }

    const editedContact = {
      id: Math.random(),
      fullName: fullName,
      email: email,
      phoneNum: phoneNum,
    };
    console.log(editedContact);

    const filteredContactsList = contacts.filter(
      (oneContact) => oneContact.id !== contact.id
    );

    filteredContactsList.push(editedContact);

    editContact(filteredContactsList);
    setActiveContactID(-1);
    setEditing(false);
  }

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
        <button className="save-changes" onClick={saveEdit}>
          Uložit změny
        </button>
      </main>
    </div>
  );
};

//dodělat errory u editu

export default EditComponent;
