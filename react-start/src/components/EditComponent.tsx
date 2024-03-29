import EditInputComponent from "./EditInputComponent";
import { useState } from "react";

interface EditComponentProps {
  cancel: any;
  setActiveContactID: any;
  setEditing: any;
  activeContactID: number;
  contactInfo: any;
  reloadDataFunc: any
}
const EditComponent: React.FC<EditComponentProps> = ({
  cancel,
  setEditing,
  activeContactID,
  setActiveContactID,
  contactInfo,
  reloadDataFunc
}) => {
  const activeContact = contactInfo;

  const [name, setName] = useState(activeContact.name);
  const [email, setEmail] = useState(activeContact.email);
  const [phone, setPhone] = useState(activeContact.phone);

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const phoneNumRegex = /^\d+$/;

  async function editContact(
    name: string,
    email: string,
    phone: number,
    id: number
  ) {
    const sendingData = {
      name: name,
      email: email,
      phone: Number(phone),
    };

    try {
      const response = await fetch(`http://localhost:7070/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sendingData),
      });

      if (response.ok) {
        console.log("HTTP požadavek byl úspěšně odeslán.");
      } else {
        console.log(JSON.stringify(sendingData));
        console.error("Chyba při odesílání HTTP požadavku:", response.status);
      }
    } catch (error) {
      console.error("Chyba při zpracování HTTP požadavku:", error);
    }
    reloadDataFunc()
  }

  function saveEdit() {
    if (name.length == 0 || !name.includes(" ")) {
      setNameError("Zadejte jméno kontaktu");
    }
    if (email.length === 0 || !email.includes("@")) {
      setEmailError("Zadejte email");
    }
    if (phone.length === 0 || !phoneNumRegex.test(phone)) {
      setPhoneError("Zadejte telefonní číslo");
    }
    if (
      name.length == 0 ||
      !name.includes(" ") ||
      email.length == 0 ||
      !email.includes("@") ||
      phone.length == 0 ||
      !phoneNumRegex.test(phone)
    ) {
    } else {
      editContact(name, email, phone, activeContactID);
      setEditing(false);
      setActiveContactID(activeContactID);
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
            setName(e.target.value);
            setNameError("");
          }}
          value={name}
          error={nameError}
          clearInput={() => {
            setName("");
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
            setPhone(e.target.value);
            setPhoneError("");
          }}
          value={phone}
          error={phoneError}
          clearInput={() => {
            setPhone("");
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

export default EditComponent;
