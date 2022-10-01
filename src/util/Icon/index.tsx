import React, { FC } from "react";

import Home from "@/public/assets/home.svg";
import Cross from "@/public/assets/cross.svg";
import Talk from "@/public/assets/talk.svg";
import Profile from "@/public/assets/profile.svg";
import HomeClicked from "@/public/assets/home_clicked.svg";
import CrossClicked from "@/public/assets/cross_clicked.svg";
import TalkClicked from "@/public/assets/talk_clicked.svg";
import ProfileClicked from "@/public/assets/profile_clicked.svg";

interface IIconProps {
  name: string;
  stroke?: string;
}

// const iconTypes: Record<string, StaticImageData> = {
//   home: Home,
//   cross: Cross,
//   talk: Talk,
//   profile: Profile,
// };

const iconTypes: any = {
  home: Home,
  cross: Cross,
  talk: Talk,
  profile: Profile,
  home_clicked: HomeClicked,
  cross_clicked: CrossClicked,
  talk_clicked: TalkClicked,
  profile_clicked: ProfileClicked,
};

const Icon: FC<IIconProps> = ({ name, ...props }) => {
  let Icon: any = iconTypes[name];
  return <Icon {...props} />;
};

export default Icon;
