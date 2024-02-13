import "./style-AddNewContact.css";
import AddValueInput from "./AddValueInput";

const AddNewContact = () => {
  return (
    <>
      <header>
        <h3>Přidat kontakt</h3>
        <button id="cancel">Zrušit</button>
      </header>

      <main>
        <h2>Přidat kontakt</h2>
        <AddValueInput name="Celé jméno" />
        <AddValueInput name="Email" />
        <AddValueInput name="Telefon" />
        <button className="create-new-contact">Přidat kontakt</button>
      </main>
    </>
  );
};

export default AddNewContact;
