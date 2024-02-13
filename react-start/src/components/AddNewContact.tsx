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
        <AddValueInput name="Celé jméno" />
        <AddValueInput name="Email" />
        <AddValueInput name="Telefon" />
        <button className="create-new-contact" onClick={}>
          Přidat kontakt
        </button>
      </main>
    </>
  );
};

export default AddNewContact;
