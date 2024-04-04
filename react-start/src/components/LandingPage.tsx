import { Link } from "wouter";

const LandingPageComponent = () => {
  return (
    <div className="w-full px-[172px] pt-[48px]">
      <h2 className="mt-[32px]">Žádné kontakty</h2>
      <p className="mt-[16px]">
        V listu momentálně nejsou žádné kontakty. Přidejte nějaký.
      </p>
      <Link
        className=" flex items-center justify-center mt-[32px] w-full h-[56px] bg-[#5DD661] rounded-[16px] text-white text-[16px] "
        href="/add"
      >
        Přidat kontakt
      </Link>
    </div>
  );
};
export default LandingPageComponent;
