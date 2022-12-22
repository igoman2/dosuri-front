import React, { FC } from "react";

import Arrow from "@/public/assets/arrow.svg";
import Check from "@/public/assets/check.svg";
import Chevron from "@/public/assets/chevron.svg";
import Close from "@/public/assets/close.svg";
import Comment from "@/public/assets/comment.svg";
import Cross from "@/public/assets/cross.svg";
import CrossClicked from "@/public/assets/cross_clicked.svg";
import Heart from "@/public/assets/heart.svg";
import Home from "@/public/assets/home.svg";
import HomeClicked from "@/public/assets/home_clicked.svg";
import Logo1 from "@/public/assets/logo1.svg";
import Logo2 from "@/public/assets/logo2.svg";
import Logo3 from "@/public/assets/logo3.svg";
import Pen from "@/public/assets/pen.svg";
import Profile from "@/public/assets/profile.svg";
import ProfileClicked from "@/public/assets/profile_clicked.svg";
import Talk from "@/public/assets/talk.svg";
import TalkClicked from "@/public/assets/talk_clicked.svg";
import TalkSqaure from "@/public/assets/talk_square.svg";
import Thumb from "@/public/assets/thumb.svg";

interface IIconProps {
  name: string;
  stroke?: string;
  strokeWidth?: string;
  fill?: string;
  width?: string;
  height?: string;
}

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
  close: Close,
  logo1: Logo1,
  logo2: Logo2,
  logo3: Logo3,
};

const Icon: FC<IIconProps> = ({ name, ...props }) => {
  let Icon: any = iconTypes[name];
  return <Icon {...props} />;
};

export default Icon;
