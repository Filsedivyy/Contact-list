import "./style-EditInputComponent.css";

const EditInputComponent = ({ type = "Celé jméno", value = "John Doe" }) => {
  return (
    <div className="input-component">
      <p>{type}</p>
      <div className="container">
        <input type="text" placeholder={value} />
        <button>
          <img src="delete-content.svg" alt="" />
        </button>
      </div>
    </div>
  );
};

export default EditInputComponent;
