import React, { FC } from "react";

import Home from "@/public/assets/home.svg";
import Cross from "@/public/assets/cross.svg";
import Talk from "@/public/assets/talk.svg";
import TalkSqaure from "@/public/assets/talk_square.svg";
import Profile from "@/public/assets/profile.svg";
import HomeClicked from "@/public/assets/home_clicked.svg";
import CrossClicked from "@/public/assets/cross_clicked.svg";
import TalkClicked from "@/public/assets/talk_clicked.svg";
import ProfileClicked from "@/public/assets/profile_clicked.svg";
import Chevron from "@/public/assets/chevron.svg";
import Heart from "@/public/assets/heart.svg";
import Comment from "@/public/assets/comment.svg";
import Check from "@/public/assets/check.svg";
import Arrow from "@/public/assets/arrow.svg";
import Pen from "@/public/assets/pen.svg";
import Thumb from "@/public/assets/thumb.svg";

interface IIconProps {
  name: string;
  stroke?: string;
  fill?: string;
  width?: string;
  height?: string;
}

// const iconTypes: Record<string, StaticImageData> = {
//   home: Home,
//   cross: Cross,
//   talk: Talk,
//   profile: Profile,
// };

export const iconTypes: any = {
  home: Home,
  cross: Cross,
  talk: Talk,
  profile: Profile,
  home_clicked: HomeClicked,
  cross_clicked: CrossClicked,
  talk_clicked: TalkClicked,
  profile_clicked: ProfileClicked,
  talk_square: TalkSqaure,
  chevron: Chevron,
  heart: Heart,
  comment: Comment,
  check: Check,
  arrow: Arrow,
  pen: Pen,
  thumb: Thumb,
};

const Icon: FC<IIconProps> = ({ name, ...props }) => {
  let Icon: any = iconTypes[name];
  return <Icon {...props} />;
};

export default Icon;
