interface EditInputProps {
  onInputChange: any;
  label: string;
  value: string;
  error: string;
  clearInput: any;
}

const EditInputComponent: React.FC<EditInputProps> = ({
  onInputChange,
  label = "Celé jméno",
  value = "John Doe",
  error,
  clearInput,
}) => {
  return (
    <div className="flex flex-col gap-[8px]">
      <p>{label}</p>
      <div className="w-full h-[48px] rounded-[14px] border-[1px] border-solid border-[#E3E3E3] flex justify-between items-center py-[4px] pl-[16px] pr-[8px]">
        <input
          className="size-full text-[14px] focus: outline-none"
          onChange={onInputChange}
          type="text"
          value={value}
        />
        <button
          onClick={() => {
            clearInput();
          }}
          className="size-[40px] flex items-center justify-center p-[8px]"
        >
          <img src="delete-content.svg" alt="" />
        </button>
      </div>
      {error && (
        <p className="opacity-100 text-red-500 flex items-center gap-[6px]">
          <img className="w-[20px] h-[20px]" src="error.svg"></img>
          {error}
        </p>
      )}
    </div>
  );
};

export default EditInputComponent;
