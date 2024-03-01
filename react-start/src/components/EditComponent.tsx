import EditInputComponent from "./EditInputComponent";
import { useState } from "react";

interface EditComponentProps {
  contact: any;
  cancel: any;
  editContact: any;
  contacts: any;
  setActiveContactID: any;
  setEditing: any;
}
const EditComponent: React.FC<EditComponentProps> = ({
  contact,
  cancel,
  editContact,
  contacts,
  setEditing,
  setActiveContactID,
}) => {
  const [fullName, setFullName] = useState(contact.fullName);
  const [email, setEmail] = useState(contact.email);
  const [phoneNum, setPhoneNum] = useState(contact.phoneNum);

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const phoneNumRegex = /^\d+$/;

  function saveEdit() {
    if (fullName.length == 0 || !fullName.includes(" ")) {
      setNameError("Zadejte jméno kontaktu");
    }
    if (email.length === 0 || !email.includes("@")) {
      setEmailError("Zadejte email");
    }
    if (phoneNum.length === 0 || !phoneNumRegex.test(phoneNum)) {
      setPhoneError("Zadejte telefonní číslo");
    }
    if (
      fullName.length == 0 ||
      !fullName.includes(" ") ||
      email.length == 0 ||
      !email.includes("@") ||
      phoneNum.length == 0 ||
      !phoneNumRegex.test(phoneNum)
    ) {
      return;
    } else {
      const editedContact = {
        id: Math.random(),
        fullName: fullName,
        email: email,
        phoneNum: phoneNum,
      };

      const filteredContactsList = contacts.filter(
        (oneContact) => oneContact.id !== contact.id
      );

      filteredContactsList.push(editedContact);

      editContact(filteredContactsList);
      setActiveContactID(editedContact.id);
      setEditing(false);
    }
  }

  return (
    <div className="w-full">
      <header className="w-full h-[48px] border-b-[1px] border-solid border-[#E3E3E3] flex justify-center items-center ">
        <h3> Upravit kontakt</h3>
        <button
          className="absolute right-[8px] top-[4px] w-[64px] h-[40px]"
          onClick={cancel}
        >
          Zrušit
        </button>
      </header>
      <main className="px-[172px] pt-[32px] flex flex-col gap-[16px]">
        <h1 className="mb-[16px]">Upravit kontakt</h1>
        <EditInputComponent
          label="Celé jméno"
          onInputChange={(e) => {
            setFullName(e.target.value);
            setNameError("");
          }}
          value={fullName}
          error={nameError}
          clearInput={() => {
            setFullName("");
          }}
        />
        <EditInputComponent
          label="Email"
          onInputChange={(e) => {
            setEmail(e.target.value);
            setEmailError("");
          }}
          value={email}
          error={emailError}
          clearInput={() => {
            setEmail("");
          }}
        />
        <EditInputComponent
          label="Telefon"
          onInputChange={(e) => {
            setPhoneNum(e.target.value);
            setPhoneError("");
          }}
          value={phoneNum}
          error={phoneError}
          clearInput={() => {
            setPhoneNum("");
          }}
        />
        <button
          className="mt-[8px] h-[56px] bg-[#5DD661] rounded-[16px] text-white "
          onClick={saveEdit}
        >
          Uložit změny
        </button>
      </main>
    </div>
  );
};

//podmínka pro telefonní číslo > AddNewContact

export default EditComponent;
