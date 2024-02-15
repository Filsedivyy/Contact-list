import "./style-InfoComponent.css";

const InfoComponent = ({ img, type, value }) => {
  return (
    <div className="info-component">
      <div className="content">
        <img src={img} alt="" />
        <div className="container">
          <h3>{type}</h3>
          <p>{value}</p>
        </div>
      </div>
      <button>
        <img src="copy.svg" alt="" />
      </button>
    </div>
  );
};

export default InfoComponent;
