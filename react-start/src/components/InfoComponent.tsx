import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

interface InfoComponentProps {
  img: string;
  type: string;
  value: string;
}

const InfoComponent: React.FC<InfoComponentProps> = ({ img, type, value }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="w-full border-b border-solid border-[#E3E3E3] flex items-center justify-between py-[14px] pl-[16px]">
      <div className="flex gap-[14px] items-center">
        <img src={img} alt="" />
        <div className="flex flex-col gap-[2px] h-fit">
          <h3 className="text-[14px]  font-[700]">{type}</h3>
          <p className="text-[14px] text-[#545454]">{value}</p>
        </div>
      </div>
      <CopyToClipboard text={value} onCopy={handleCopy}>
        <button className="h-[40px] w-[40px] hover:opacity-60  focus:opacity-100">
          <img src="copy.svg" alt="Copy" />
        </button>
      </CopyToClipboard>
    </div>
  );
};

export default InfoComponent;
