const LandingPageComponent = ({ setActiveContactID }) => {
  return (
    <div className="w-full px-[172px] pt-[48px]">
      <h2 className="mt-[32px]">Žádné kontakty</h2>
      <p className="mt-[16px]">
        V listu momentálně nejsou žádné kontakty. Přidejte nějaký.
      </p>
      <button
        className="mt-[32px] w-full h-[56px] bg-[#5DD661] rounded-[16px] text-white text-[16px] "
        onClick={() => setActiveContactID(-1)}
      >
        Přidat kontakt
      </button>
    </div>
  );
};
export default LandingPageComponent;
