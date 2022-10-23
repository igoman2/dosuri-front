import Image from "next/image";
import React, { FC, useState } from "react";
import Toggle_on from "@/public/assets/toggle_on.png";
import Toggle_off from "@/public/assets/toggle_off.png";

interface IToggleProps {
  isActive: boolean;
}

const ToggleBar: FC<IToggleProps> = ({ isActive }) => {
  const [isToggleActive, setIsToggleActive] = useState<boolean>(isActive);
  const onToggle = () => {
    setIsToggleActive((prev) => !prev);
  };
  return (
    <div onClick={onToggle}>
      {isToggleActive ? (
        <Image src={Toggle_on} width={25} height={25} alt="toggle-on" />
      ) : (
        <Image src={Toggle_off} width={25} height={25} alt="toggle-off" />
      )}
    </div>
  );
};

export default ToggleBar;
