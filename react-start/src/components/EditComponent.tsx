import EditInputComponent from "./EditInputComponent";
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { ContactInfo } from "../app";
interface EditComponentProps {
  contact: ContactInfo;
  taskHandler: () => void;
}
const EditComponent: React.FC<EditComponentProps> = ({
  contact,
  taskHandler,
}) => {
  const [name, setName] = useState(contact.name);
  const [email, setEmail] = useState(contact.email);
  const [phone, setPhone] = useState(contact.phone);

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [fetchError, setFetchError] = useState("Uložit změny");

  const [location, navigate] = useLocation();
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
        setFetchError("Uloženo");
        setTimeout(() => {
          navigate(`/${contact.id}`);
          taskHandler();
        }, 400);
      } else {
        return;
      }
    } catch (error) {
      console.error("Chyba při zpracování HTTP požadavku:", error);
    }
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
      editContact(name, email, Number(phone), contact.id);
    }
  }

  return (
    <div className="w-full">
      <header className="w-full flex items-center justify-center h-[48px] border-b-2 border-gray-300 py-[4px]">
        <h3> Upravit kontakt</h3>
        <Link href={`/${contact.id}`}>
          <button className="absolute right-[14px] top-[4px] w-[64px] h-[40px] hover:opacity-70 active:border-b-2 rounded-[16px]  border-[#5DD661]">
            Zrušit
          </button>
        </Link>
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
          className=" flex items-center justify-center mt-[8px] h-[56px] bg-[#5DD661] rounded-[16px] text-white  hover:bg-[#6ef573] active:bg-[#34cc39]"
          onClick={saveEdit}
        >
          {fetchError}
        </button>
      </main>
    </div>
  );
};

export default EditComponent;
