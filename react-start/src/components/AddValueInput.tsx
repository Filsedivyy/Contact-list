import React from "react";

interface AddValueInputProps {
  name: string;
  error: string;
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
    <div className="w-full flex flex-col gap-[8px]">
      <p className="text-[14px]">{name}</p>
      <input
        className={`h-[48px] px-[16px] py-[14px] rounded-[14px] border-[1px] border-solid ${
          error ? "border-[2px] border-red-500" : "border-rgb(227, 227, 227)"
        } focus: outline-1 outline-[#5DD661]`}
        type="text"
        value={inputValue}
        onChange={onInputChange}
        placeholder={name}
      />
      {error && (
        <p className="opacity-100 text-red-500 flex items-center gap-[6px]">
          <img
            className="w-[20px] h-[20px]"
            src="error.svg"
            alt="Error Icon"
          ></img>
          {error}
        </p>
      )}
    </div>
  );
};
export default AddValueInput;
