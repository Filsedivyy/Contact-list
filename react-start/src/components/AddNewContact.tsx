import "./style-AddNewContact.css";

const AddNewContact = () => {
  return (
    <>
      <header>
        <h3>Přidat kontakt</h3>
        <button>Zrušit</button>
      </header>
      <main>
        <h2>Přidat kontakt</h2>
        <div className="inputContainer">
          <p>Celé jméno</p>
          <input type="text" placeholder="Celé jméno" />
        </div>
      </main>
    </>
  );
};

export default AddNewContact;
