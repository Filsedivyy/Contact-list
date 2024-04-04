import React, { useState, useEffect } from "react";
import { Link, Route, Switch } from "wouter";
import AddNewContact from "./components/AddNewContact";
import ContactPage from "./components/ContactPage";
import LandingPageComponent from "./components/LandingPage";

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

/*

TODOS

opravit edit při reloadu stránky,
pokud smažu 1. kontakt, nahodí se loading místo jiného kontaktu + je funkce pomalá a dělá prokliky
pokud přidám kontakt, zobrazí se detail nového kontaktu -> JSON error vypsaný v komponentu

*/

const App = () => {
  const [contacts, setContacts] = useState<ContactFragment[]>([]);
  const [activeContactID, setActiveContactID] = useState(0);
  const [filterInputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value);
  }

  useEffect(() => {
    fetchContacts();
  }, []);

  async function fetchContacts() {
    const response = await fetch("http://localhost:7070/contact/id/name", {
      method: "GET",
    });
    const data: ContactInfo[] = await response.json();
    setContacts(data);
    setIsLoading(false);
  }

  async function onAdd(id: number) {
    await fetchContacts();
    console.log("onADD použito")
    setActiveContactID(id);
  }

  async function deleteContactFromDb(id: number) {
    await fetch(`http://localhost:7070/delete/${id}`, {
      method: "DELETE",
    });
    onAdd(contacts[0].id)
    contacts === null
      ? (() => {
          window.location.href = "/";
        })()
      : (() => {
          window.location.href = `/${contacts[0].id}`;
          console.log(contacts[0].id);
        })();
    // funkce se musí opravit, aby pokud se smaže 1. kontakt jiný ho nahradí + je tam nějaký loading
  }

  function cancel() {
    // lze použít při mazání kontaktu
    contacts === null
      ? (
          window.location.href = "/"
        )
      : (() => {
          window.location.href = `/${contacts[0].id}`;
          console.log(contacts[0].id);
        });
  }
  return (
    <div className="flex">
      <div className="relative h-screen max-w-[400px] min-w-[400px] border-r-2 border-gray-300">
        <header className="py-[4px] px-[8px] border-b-2 border-gray-300 flex justify-center items-center h-[48px]">
          <h3>Kontakty</h3>
          <button className="absolute top-[4px] right-[4px] h-[40px] w-[40px] flex items-center justify-center cursor-pointer border-none">
            <Link href="/add">
              <img src="./icon.svg" alt="" />
            </Link>
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

        {isLoading ? (
          <div>Načítání...</div>
        ) : contacts === null ? (
          <div>Žádné kontakty</div>
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
                    className={`border-b border-solid border-gray-300 pl-[16px] pt-[14px] pb-[16px] text-[14px] leading-[20px] hover:bg-[#daf6db] cursor-pointer ${
                      activeContactID === contactFragment.id
                        ? "bg-[#5DD661] text-white hover:bg-[#127615] "
                        : ""
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
          <LandingPageComponent />
        </Route>
        <Route path="/add">
          <AddNewContact cancelFunc={cancel} onAddFunc={onAdd}></AddNewContact>
        </Route>
        <Route path="/:id/edit">
          <ContactPage
           // deleteFunc={deleteContactFromDb}
            setActiveContactIdFunc={setActiveContactID}
            onAddFunc={onAdd}
          />
        </Route>
        <Route path="/:id">
          <ContactPage
          //  deleteFunc={deleteContactFromDb}
            setActiveContactIdFunc={setActiveContactID}
            onAddFunc={onAdd}
          />
        </Route>
      </Switch>
    </div>
  );
};

/*
  return <AddNewContact cancelFunc={cancel} onAddFunc={onAdd}></AddNewContact>;
};
*/
export default App;
