const InfoComponent = ({ img, type, value }) => {
  return (
    <div className="w-full border-b border-solid border-[#E3E3E3] flex items-center justify-between py-[14px] pl-[16px]">
      <div className="flex gap-[14px] items-center">
        <img src={img} alt="" />
        <div className="flex flex-col gap-[2px] h-fit">
          <h3 className="text-[14px]">{type}</h3>
          <p className="text-[14px] text-[#545454]">{value}</p>
        </div>
      </div>
      <button className="h-[40px] w-[40px]">
        <img src="copy.svg" alt="" />
      </button>
    </div>
  );
};

export default InfoComponent;
