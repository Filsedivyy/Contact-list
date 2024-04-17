import React from "react";

interface AddValueInputProps {
  label: string;
  id: string;
  error: string;
  inputValue: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AddValueInput: React.FC<AddValueInputProps> = ({
  inputValue,
  onInputChange,
  id,
  error,
  label,
}) => {
  return (
    <div className="w-full flex flex-col gap-[8px]">
      <label htmlFor={id} className="text-[14px] font-[700]">
        {label}
      </label>
      <input
        className={` h-[48px] px-[16px] py-[14px] rounded-[14px] border-[1px] border-solid ${
          error ? "border-[2px] border-red-500" : "border-rgb(227, 227, 227)"
        } focus: outline-1 outline-[#5DD661]`}
        type="text"
        id={id}
        value={inputValue}
        onChange={onInputChange}
        placeholder={label}
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
