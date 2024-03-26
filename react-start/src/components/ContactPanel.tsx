import React, { useState } from "react";

interface ContactPanelProps {
  setActiveContactID: Function;
  ActiveContactID: Number;
  contactFragments: any;
  getContactInfoFunc: any;
}

const ContactPanel: React.FC<ContactPanelProps> = ({
  setActiveContactID,
  ActiveContactID,
  contactFragments,
  getContactInfoFunc,
}) => {
  const [filterInputValue, setInputValue] = useState("");

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value);
  }

  return (
    <div className="relative h-screen min-w-[400px] border-r-2 border-gray-300">
      <header className="py-[4px] px-[8px] border-b-2 border-gray-300 flex justify-center items-center h-[47px]">
        <h3>Kontakty</h3>
        <button
          className="absolute top-[4px] right-[4px] h-[40px] w-[40px] flex items-center justify-center cursor-pointer border-none"
          onClick={() => setActiveContactID(-1)}
        >
          <img src="./icon.svg" alt="" />
        </button>
      </header>

      <div className="pt-[32px] pb-[8px] px-[16px] flex flex-col gap-[16px]">
        <h2>Kontakty</h2>
        <input
          className="w-full h-[48px] py-[16px] px-[14px] border-2 border-gray-300 rounded-[14px]"
          type="text"
          value={filterInputValue}
          onChange={handleChange}
          placeholder="hledat"
        />
      </div>
      <ul className="flex flex-col list-none">
        {contactFragments
          .filter(
            (contactFragment: { name: string }) =>
              filterInputValue.length === 0 ||
              contactFragment.name
                .toLowerCase()
                .includes(filterInputValue.toLowerCase())
          )
          .map((contactFragment: { id: number; name: string }) => (
            <li
              className={`border-b border-solid border-gray-300 pl-[16px] pt-[14px] pb-[16px] text-[14px] leading-[20px] hover:bg-[#daf6db] cursor-pointer ${
                ActiveContactID === contactFragment.id
                  ? "bg-[#5DD661] text-white hover:bg-[#127615] "
                  : ""
              }`}
              onClick={() => getContactInfoFunc(contactFragment.id)}
              key={contactFragment.id}
            >
              {contactFragment.name}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ContactPanel;
