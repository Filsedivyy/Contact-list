import "./style-EditInputComponent.css";

const EditInputComponent = ({
  onChange,
  label = "Celé jméno",
  value = "John Doe",
}) => {
  return (
    <div className="input-component">
      <p>{label}</p>
      <div className="container">
        <input
          onChange={(e) => onChange(e.target.value)}
          type="text"
          value={value}
        />
        <button>
          <img src="delete-content.svg" alt="" />
        </button>
      </div>
    </div>
  );
};

export default EditInputComponent;
