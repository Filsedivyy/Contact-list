import React from "react";
import "./style-addValueInput.css";

interface AddValueInputProps {
  name: string;
  error?: string;
  inputValue: any;
  onInputChange: any;
}

const AddValueInput: React.FC<AddValueInputProps> = ({
  inputValue,
  onInputChange,
  error,
  name,
}) => {
  return (
    <div className="input-container">
      <p>{name}</p>
      <input
        type="text"
        value={inputValue}
        onChange={onInputChange}
        placeholder={name}
      />
      {error && (
        <p className={"warning active"}>
          <img className="error-icon" src="error.svg"></img>
          {error}
        </p>
      )}
    </div>
  );
};

export default AddValueInput;
