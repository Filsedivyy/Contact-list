import React from "react";
import "./style-addValueInput.css";

interface AddValueInputProps {
  name: string;
}

const AddValueInput: React.FC<AddValueInputProps> = ({ name }) => {
  return (
    <div className="input-container">
      <p>{name}</p>
      <input type="text" placeholder={name} />
      <p className="warning active">Zadejte {name}</p>
    </div>
  );
};

export default AddValueInput;
