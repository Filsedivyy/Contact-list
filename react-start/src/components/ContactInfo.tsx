import "./style-ContactInfo.css";

const ContactInfo = (/*fullName, email, phoneNum*/) => {
  return (
    <div className="contact-info">
      <header>
        <div className="placeholder"></div>
        <h2>Test</h2>
        <div className="button-container">
          <button>
            <img src="./delete.svg" alt="" />
          </button>
          <button>
            <img src="./edit.svg" alt="" />
          </button>
        </div>
      </header>
      <main>
        <h1>Test</h1>
        <div className="item">
          <img src="./email.svg" alt="" />
          <div className="info-container">
            <h5>Email</h5>
            <p>test</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContactInfo;
