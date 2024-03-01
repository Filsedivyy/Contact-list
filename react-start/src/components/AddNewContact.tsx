import AddValueInput from "./AddValueInput";
import { useState } from "react";

interface AddNewContactProps {
  addContact: any;
  cancel: any;
}

const AddNewContact: React.FC<AddNewContactProps> = ({
  addContact,
  cancel,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const phoneNumRegex = /^\d+$/;

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
      const newContact = {
        id: Math.random(),
        fullName: name.trim(),
        email: email.trim(),
        phoneNum: phone.trim(),
      };
      addContact(newContact);
      setName("");
      setEmail("");
      setPhone("");
    }
  }

  return (
    <div className="w-full flex flex-col ">
      <header className="w-full h-[48px] border-b-2 border-gray-300 flex justify-center items-center">
        <h3>Přidat kontakt</h3>
        <button
          className="absolute right-[8px] top-[4px] w-[64px] h-[40px] cursor-pointer border-none bg-transparent"
          id="cancel"
          onClick={cancel}
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
          className="mt-[8px] h-[56px] bg-[#5DD661] text-white rounded-[16px] border-none "
          onClick={handleClick}
        >
          Přidat kontakt
        </button>
      </main>
    </div>
  );
};

export default AddNewContact;
