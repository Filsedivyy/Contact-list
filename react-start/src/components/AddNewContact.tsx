import "./style-AddNewContact.css";
import AddValueInput from "./AddValueInput";
import { useState } from "react";

const AddNewContact = ({ addContact, cancel }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  function handleClick() {
    if (name.length == 0) {
      setNameError("Zadejte jméno kontaktu");
    }
    if (email.length == 0) {
      setEmailError("Zadejte email");
    }
    if (phone.length == 0) {
      setPhoneError("Zadejte tel. číslo");
    }
    if (name.length == 0 || email.length == 0 || phone.length == 0) {
      return;
    } else {
      const newContact = {
        id: Math.random(),
        fullName: name,
        email: email,
        phoneNum: phone,
      };
      addContact(newContact);
      setName("");
      setEmail("");
      setPhone("");
    }
  }

  return (
    <div className="add-new-contact">
      <header>
        <h3>Přidat kontakt</h3>
        <button id="cancel" onClick={cancel}>
          Zrušit
        </button>
      </header>

      <main>
        <h2>Přidat kontakt</h2>
        <AddValueInput
          inputValue={name}
          onInputChange={(e) => {
            setName(e.target.value);
            setNameError("");
          }}
          name="Celé jméno"
          error={nameError}
        />
        <AddValueInput
          inputValue={email}
          onInputChange={(e) => {
            setEmail(e.target.value);
            setEmailError("");
          }}
          name="Email"
          error={emailError}
        />
        <AddValueInput
          inputValue={phone}
          onInputChange={(e) => {
            setPhone(e.target.value);
            setPhoneError("");
          }}
          name="Telefon"
          error={phoneError}
        />
        <button className="create-new-contact" onClick={handleClick}>
          Přidat kontakt
        </button>
      </main>
    </div>
  );
};

export default AddNewContact;
