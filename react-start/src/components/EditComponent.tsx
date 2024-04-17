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
  const [formData, setFormData] = useState({
    name: contact.name,
    email: contact.email,
    phone: contact.phone,
  });

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
    const { name, email, phone } = formData;
    let errorCounter = 0;
    if (name.length === 0 || !name.includes(" ")) {
      setNameError("Zadejte jméno kontaktu");
      errorCounter += 1;
    }
    if (email.length === 0 || !email.includes("@")) {
      setEmailError("Zadejte email");
      errorCounter += 1;
    }
    if (phone.length === 0 || !phoneNumRegex.test(phone)) {
      setPhoneError("Zadejte telefonní číslo");
      errorCounter += 1;
    }
    if (errorCounter > 0) {
      return;
    }
    editContact(name, email, Number(phone), contact.id);
  }

  function setForm(e) {
    setFormData((prevData) => {
      return { ...prevData, [e.target.id]: e.target.value };
    });
  }

  return (
    <div className="w-full ">
      <header className="w-full flex items-center justify-center h-[48px] border-b-2 border-gray-300 py-[4px]">
        <h3 className="font-[700]"> Upravit kontakt</h3>
        <Link href={`/${contact.id}`}>
          <button className="absolute right-[14px] top-[4px] w-[64px] h-[40px] hover:opacity-70 active:border-b-2 rounded-[16px]  border-[#5DD661]">
            Zrušit
          </button>
        </Link>
      </header>
      <main className="px-[172px] pt-[32px] flex flex-col gap-[16px]">
        <h1 className="mb-[16px] text-[22px] font-[700]">Upravit kontakt</h1>
        <EditInputComponent
          label="Celé jméno"
          onInputChange={(e) => {
            setForm(e);
            setNameError("");
          }}
          value={formData.name}
          error={nameError}
          clearInput={() => {
            setForm({ target: { id: "name", value: "" } });
          }}
          id="name"
        />
        <EditInputComponent
          label="Email"
          onInputChange={(e) => {
            setForm(e);
            setEmailError("");
          }}
          value={formData.email}
          error={emailError}
          clearInput={() => {
            setForm({ target: { id: "email", value: "" } });
          }}
          id="email"
        />
        <EditInputComponent
          label="Telefon"
          onInputChange={(e) => {
            setForm(e);
            setPhoneError("");
          }}
          value={formData.phone}
          error={phoneError}
          clearInput={() => {
            setForm({ target: { id: "phone", value: "" } });
          }}
          id="phone"
        />
        <button
          className="flex items-center justify-center mt-[8px] h-[56px] bg-[#5DD661] rounded-[16px] text-white hover:bg-[#6ef573] active:bg-[#34cc39]"
          onClick={saveEdit}
        >
          {fetchError}
        </button>
      </main>
    </div>
  );
};

export default EditComponent;
