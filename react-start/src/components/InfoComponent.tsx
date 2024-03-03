import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

interface InfoComponentProps {
  img: any;
  type: string;
  value: any;
}

const InfoComponent: React.FC<InfoComponentProps> = ({ img, type, value }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const count = useContext(AppContext);

  return (
    <div className="w-full border-b border-solid border-[#E3E3E3] flex items-center justify-between py-[14px] pl-[16px]">
      <div className="flex gap-[14px] items-center">
        <img src={img} alt="" />
        <div className="flex flex-col gap-[2px] h-fit">
          <h3 className="text-[14px]">{type}</h3>
          <p className="text-[14px] text-[#545454]">{value}{test}</p>
        </div>
      </div>
      <CopyToClipboard text={value} onCopy={handleCopy}>
        <button className="h-[40px] w-[40px]">
          <img src="copy.svg" alt="Copy" />
        </button>
      </CopyToClipboard>
    </div>
  );
};

export default InfoComponent;
