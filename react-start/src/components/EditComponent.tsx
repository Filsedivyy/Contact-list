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

  function saveEdit() {
    if (fullName.length === 0 || email.length === 0 || phoneNum.length === 0) {
      return;
    }

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
          onChange={setFullName}
          value={fullName}
        />
        <EditInputComponent label="Email" onChange={setEmail} value={email} />
        <EditInputComponent
          label="Telefon"
          onChange={setPhoneNum}
          value={phoneNum}
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

//dodělat errory u editu, focus input pole

export default EditComponent;
