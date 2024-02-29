import InfoComponent from "./InfoComponent";

const ContactInfo = ({ contact, deleteContact, editContact }) => {
  return (
    <div className="flex flex-col items-center w-full">
      <header className="w-full flex items-center justify-center h-[48px] border-b border-[#E3E3E3] py-[4px]">
        <h2>{contact.fullName}</h2>
        <div className="flex gap-[8px] absolute right-[8px] top-[4px]">
          <button
            className="size-[40px] p-[8px] flex items-center justify-center"
            onClick={() => deleteContact(contact.id)}
          >
            <img src="./delete.svg" alt="" />
          </button>
          <button
            className="size-[40px] p-[8px] flex items-center justify-center"
            onClick={() => editContact(contact.id)}
          >
            <img src="./edit.svg" alt="" />
          </button>
        </div>
      </header>
      <main className="w-full px-[172px]">
        <h1 className="mt-[32px] mb-[16px]">{contact.fullName}</h1>
        <InfoComponent img={"email.svg"} type={"Email"} value={contact.email} />
        <InfoComponent
          img={"phone.svg"}
          type={"Telefon"}
          value={contact.phoneNum}
        />
      </main>
    </div>
  );
};

export default ContactInfo;
