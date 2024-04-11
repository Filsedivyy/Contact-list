import InfoComponent from "./InfoComponent";
import { Link } from "wouter";
interface ContactDetailProps {
  contact: any;
  deleteContact: any;
}

const ContactDetail: React.FC<ContactDetailProps> = ({
  contact,
  deleteContact,
}) => {
  return (
    <div className="flex flex-col items-center w-full">
      <header className="w-full flex items-center justify-center h-[48px] border-b-2 border-gray-300 py-[4px]">
        <h2>{contact.name}</h2>
        <div className="flex gap-[8px] absolute right-[14px] top-[4px]">
          <button
            className="size-[40px] p-[8px] flex items-center justify-center hover:opacity-70 active:border-b-2 rounded-[16px]  border-[#5DD661]"
            onClick={() => {
              deleteContact(contact.id);
            }}
          >
            <img src="./delete.svg" alt="" />
          </button>
          <Link href={`${contact.id}/edit`}>
            <button className="size-[40px] p-[8px] flex items-center justify-center hover:opacity-70 active:border-b-2 rounded-[16px]  border-[#5DD661]">
              <img src="./edit.svg" alt="" />
            </button>
          </Link>
        </div>
      </header>
      <main className="w-full px-[172px]">
        <h1 className="mt-[32px] mb-[16px]">{contact.name}</h1>
        <InfoComponent img={"email.svg"} type={"Email"} value={contact.email} />
        <InfoComponent
          img={"phone.svg"}
          type={"Telefon"}
          value={contact.phone}
        />
      </main>
    </div>
  );
};

export default ContactDetail;
