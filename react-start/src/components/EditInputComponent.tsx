interface AddValueInputProps {
  onChange: any;
  label: string;
  value: any;
}

const EditInputComponent: React.FC<AddValueInputProps> = ({
  onChange,
  label = "Celé jméno",
  value = "John Doe",
}) => {
  return (
    <div className="flex flex-col gap-[8px]">
      <p>{label}</p>
      <div className="w-full h-[48px] rounded-[14px] border-[1px] border-solid border-[#E3E3E3] flex justify-between items-center py-[4px] pl-[16px] pr-[8px]">
        <input
          className="size-full text-[14px]"
          onChange={(e) => onChange(e.target.value)}
          type="text"
          value={value}
        />
        <button className="size-[40px] flex items-center justify-center p-[8px]">
          <img src="delete-content.svg" alt="" />
        </button>
      </div>
    </div>
  );
};

export default EditInputComponent;
