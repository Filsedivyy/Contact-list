import React, { useState, useEffect } from "react";
import { Link, Route, Switch, useLocation } from "wouter";
import AddNewContact from "./pages/AddNewContact";
import ContactPage from "./pages/ContactPage";
import EmptyContactPage from "./pages/EmptyContactPage";
import LoadingComponent from "./components/Loading";
import HomePage from "./pages/HomePage";

export interface ContactFragment {
  id: number;
  name: string;
}

export interface ContactInfo {
  id: number;
  name: string;
  email: string;
  phone: string;
  created: string;
}

const App = () => {
  const [contacts, setContacts] = useState<ContactFragment[]>([]);
  const [activeContactID, setActiveContactID] = useState(0);
  const [filterInputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [location, navigate] = useLocation();

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value);
  }

  useEffect(() => {
    fetchContacts();
  }, []);
  async function fetchContacts(): Promise<ContactFragment[]> {
    const response = await fetch("http://localhost:7070/contact/id/name", {
      method: "GET",
    });
    const data: ContactInfo[] = await response.json();
    setContacts(data);
    setIsLoading(false);
    return data;
  }

  async function onAdd() {
    await fetchContacts();
  }

  async function deleteContactFromDb(id: number) {
    await fetch(`http://localhost:7070/delete/${id}`, {
      method: "DELETE",
    });
    cancelFunc(await fetchContacts());
  }

  function cancelFunc(contacts: ContactFragment[]) {
    if (contacts.length == 0) {
      navigate("/");
    } else {
      navigate(`/${contacts[0].id}`);
    }
  }
  return (
    <div className="flex">
      <div className="relative h-screen max-w-[400px] min-w-[400px] border-r-2 border-gray-300">
        <header className="py-[4px] px-[8px] border-b-2 border-gray-300 flex justify-center items-center h-[48px]">
          <h3>Kontakty</h3>
          <Link href={"/add"}>
            <button className="absolute right-[14px] top-[4px] size-[40px] p-[8px] flex items-center justify-center hover:opacity-70 active:border-b-2 rounded-[16px]  border-[#5DD661]">
              <img src="../icon.svg" alt="" />
            </button>
          </Link>
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

        {isLoading ? (
          <LoadingComponent />
        ) : contacts === null ? (
          <div className="w-full flex justify-center pt-[100px]">
            Žádné kontakty
          </div>
        ) : (
          <ul>
            {contacts
              .filter(
                (contactFragment: { name: string }) =>
                  filterInputValue.length === 0 ||
                  contactFragment.name
                    .toLowerCase()
                    .includes(filterInputValue.toLowerCase())
              )
              .map((contactFragment: { id: number; name: string }) => (
                <Link href={`/${contactFragment.id}`} key={contactFragment.id}>
                  <li
                    className={`border-b border-solid border-gray-300 pl-[16px] pt-[14px] pb-[16px] text-[14px] leading-[20px]  cursor-pointer ${
                      activeContactID == contactFragment.id
                        ? "bg-[#5DD661] text-white hover:bg-[#34cc39] "
                        : "hover:bg-[#cffcd1]"
                    }`}
                  >
                    {contactFragment.name}
                  </li>
                </Link>
              ))}
          </ul>
        )}
      </div>
      <Switch>
        <Route path="/">
          {contacts === null ? <EmptyContactPage /> : <HomePage />}
        </Route>
        <Route path="/add">
          <AddNewContact
            setActiveContactIdFunc={setActiveContactID}
            onAddFunc={onAdd}
          ></AddNewContact>
        </Route>
        <Route path="/:id/edit">
          <ContactPage
            deleteContact={deleteContactFromDb}
            setActiveContactIdFunc={setActiveContactID}
            onAddFunc={onAdd}
          />
        </Route>
        <Route path="/:id">
          <ContactPage
            deleteContact={deleteContactFromDb}
            setActiveContactIdFunc={setActiveContactID}
            onAddFunc={onAdd}
          />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
