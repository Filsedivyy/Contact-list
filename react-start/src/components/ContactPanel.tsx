import data from "../data.jsx";
import "./style-ContactPanel.css";
import { useState } from "react";

const ContactPanel = () => {
  const [filterInputValue, setInputValue] = useState("");

  function handleChange(event) {
    setInputValue(event.target.value);
    //console.log(event.target.value);
  }
  return (
    <div className="contact-panel">
      <header>
        <div className="wrapper">
          <div className="placeholder"></div>
          <h3>Kontakty</h3>
          <button>
            <img src="./icon.svg" alt="" />
          </button>
        </div>
      </header>
      <main>
        <div className="container">
          <h2>Kontakty</h2>
          <input
            type="text"
            value={filterInputValue}
            onChange={handleChange}
            placeholder="hledat"
          />
        </div>
        <ul>
          {data
            .filter(
              (oneContact) =>
                filterInputValue.length === 0 ||
                oneContact.fullName
                  .toLowerCase()
                  .includes(filterInputValue.toLowerCase())
            )
            .map((oneContact) => (
              <li key={oneContact.id}>{oneContact.fullName}</li>
            ))}
        </ul>
      </main>
    </div>
  );
};

export default ContactPanel;
