import AddValueInput from "../components/AddValueInput";
import { useLocation } from "wouter";
import { FC, useState } from "react";
interface AddNewContactProps {
  onAddFunc: () => void;
  setActiveContactIdFunc: (id: number) => void;
  cancelFunc: () => void;
}

const AddNewContact: FC<AddNewContactProps> = ({
  onAddFunc,
  setActiveContactIdFunc,
  cancelFunc,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [fetchState, setFetchState] = useState("Přidat kontakt");

  const [location, navigate] = useLocation();

  const phoneNumRegex = /^\d+$/;

  setActiveContactIdFunc(0);

  async function addContactToDB(name: string, email: string, phone: number) {
    const sendingData = {
      name: name,
      email: email,
      phone: phone,
    };

    const response = await fetch("http://localhost:7070/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendingData),
    });

    if (response.ok) {
      const responseData = await response.json();
      setFetchState("Odesláno");
      setTimeout(() => {
        onAddFunc();
        navigate(`/${responseData.id}`);
      }, 200);
    } else {
      console.log(response.status);
      setFetchState("Chyba odeslání");
    }
  }

  function handleClick() {
    const { name, email, phone } = formData;
    let errorCount = 0;
    if (name.length == 0 || !name.trim().includes(" ")) {
      setNameError("Zadejte jméno kontaktu");
      errorCount += 1;
    }
    if (email.length == 0 || !email.includes("@")) {
      setEmailError("Zadejte email");
      errorCount += 1;
    }
    if (phone.length === 0 || !phoneNumRegex.test(phone)) {
      setPhoneError("Zadejte tel. číslo");
      errorCount += 1;
    }
    if (errorCount > 0) {
      setFetchState("Chyba odeslání");
      setTimeout(() => {
        setFetchState("Přidat kontakt");
      }, 1500);
      return;
    }

    addContactToDB(name.trim(), email.trim(), Number(phone)); //ošetřit inputValue
  }

  function setForm(e) {
    setFormData((prevData) => {
      return { ...prevData, [e.target.id]: e.target.value };
    });
  }

  return (
    <div className="w-full flex flex-col ">
      <header className="w-full h-[48px] border-b-2 border-gray-300 flex justify-center items-center">
        <h3 className="font-[700]">Přidat kontakt</h3>
        <button
          onClick={cancelFunc}
          className="absolute right-[14px] top-[4px] w-[64px] h-[40px] hover:opacity-70 active:border-b-2 rounded-[16px]  border-[#5DD661]"
        >
          Zrušit
        </button>
      </header>

      <main className="px-[172px] flex flex-col gap-[16px]">
        <h1 className="text-[22px] mt-[32px] mb-[16px] font-[700]">
          Přidat kontakt
        </h1>
        <AddValueInput
          inputValue={formData.name}
          onInputChange={(e) => {
            setForm(e);
            setNameError("");
          }}
          id="name"
          label="Celé jméno"
          error={nameError}
        />
        <AddValueInput
          inputValue={formData.email}
          onInputChange={(e) => {
            setForm(e);
            setEmailError("");
          }}
          id="email"
          label="Email"
          error={emailError}
        />
        <AddValueInput
          inputValue={formData.phone}
          onInputChange={(e) => {
            setForm(e);
            setPhoneError("");
          }}
          id="phone"
          label="Telefon"
          error={phoneError}
        />
        <button
          onClick={handleClick}
          className=" flex items-center justify-center mt-[8px] h-[56px] bg-[#5DD661] text-white rounded-[16px] border-none hover:bg-[#6ef573] active:bg-[#34cc39] "
        >
          {fetchState}
        </button>
      </main>
    </div>
  );
};

export default AddNewContact;
