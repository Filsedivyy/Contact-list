import "./style-EditComponent.css";
import EditInputComponent from "./EditInputComponent";
const EditComponent = (
  contactName,
  contactEmail,
  contactPhoneNum,
  cancelButton
) => {
  return (
    <div className="edit-component">
      <header>
        <h3> Upravit kontakt</h3>
        <button id="cancel" onClick={cancelButton}>
          Zrušit
        </button>
      </header>
      <main>
        <h1>Upravit kontakt</h1>
        <EditInputComponent type="Celé jméno" value={contactName} />
        <EditInputComponent type="Email" value={contactEmail} />
        <EditInputComponent type="Telefon" value={contactPhoneNum} />
        <button className="save-changes">Uložit změny</button>
      </main>
    </div>
  );
};

export default EditComponent;
