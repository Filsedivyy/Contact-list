import { Link } from "wouter";
import AddValueInput from "./AddValueInput";
import { FC, useState } from "react";
interface AddNewContactProps {
  onAddFunc: any;
  cancelFunc: any;
}

const AddNewContact: FC<AddNewContactProps> = ({ onAddFunc, cancelFunc }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const phoneNumRegex = /^\d+$/;

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
      console.log(responseData);
      onAddFunc();
    }
  }

  function handleClick() {
    if (name.length == 0 || !name.trim().includes(" ")) {
      setNameError("Zadejte jméno kontaktu");
    }
    if (email.length == 0 || !email.includes("@")) {
      setEmailError("Zadejte email");
    }
    if (phone.length === 0 || !phoneNumRegex.test(phone)) {
      setPhoneError("Zadejte tel. číslo");
    }
    if (
      name.length == 0 ||
      !name.trim().includes(" ") ||
      email.length == 0 ||
      !email.includes("@") ||
      phone.length == 0 ||
      !phoneNumRegex.test(phone)
    ) {
      return;
    } else {
      addContactToDB(name.trim(), email.trim(), Number(phone));
      // window.location.href = "/"; //temporary fix, správně by to mělo přesměrovat na detail nového kontaktu
    }
  }

  return (
    <div className="w-full flex flex-col ">
      <header className="w-full h-[48px] border-b-2 border-gray-300 flex justify-center items-center">
        <h3>Přidat kontakt</h3>
        <button
          onClick={cancelFunc}
          className="absolute right-[8px] top-[4px] w-[64px] h-[40px] cursor-pointer border-none bg-transparent"
          id="cancel"
        >
          Zrušit
        </button>
      </header>

      <main className="px-[172px] flex flex-col gap-[16px]">
        <h2 className="mt-[32px] mb-[16px]">Přidat kontakt</h2>
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
        <button
          onClick={handleClick}
          className=" flex items-center justify-center mt-[8px] h-[56px] bg-[#5DD661] text-white rounded-[16px] border-none "
        >
          Přidat kontakt
        </button>
      </main>
    </div>
  );
};

export default AddNewContact;
