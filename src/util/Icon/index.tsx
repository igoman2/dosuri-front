import React, { FC } from "react";
import Arrow from "@/public/assets/arrow.svg";
import Check from "@/public/assets/check.svg";
import Chevron from "@/public/assets/chevron.svg";
import Close from "@/public/assets/close.svg";
import Back from "@/public/assets/back.svg"; // [COMMENT] 이거 이상하게 보여서 일단 Arrow 씁니다.
import Comment from "@/public/assets/comment.svg";
import Cross from "@/public/assets/cross.svg";
import CrossClicked from "@/public/assets/cross_clicked.svg";
import Delete from "@/public/assets/delete.svg";
import Happy from "@/public/assets/happy.svg";
import Heart from "@/public/assets/heart.svg";
import Home from "@/public/assets/home.svg";
import HomeClicked from "@/public/assets/home_clicked.svg";
import Logo1 from "@/public/assets/logo1.svg";
import Logo2 from "@/public/assets/logo2.svg";
import Logo3 from "@/public/assets/logo3.svg";
import Neutral from "@/public/assets/neutral.svg";
import NotificationOff from "@/public/assets/notification_off.svg";
import NotificationOn from "@/public/assets/notification_on.svg";
import Pen from "@/public/assets/pen.svg";
import Profile from "@/public/assets/profile.svg";
import ProfileClicked from "@/public/assets/profile_clicked.svg";
import Sad from "@/public/assets/sad.svg";
import Setting from "@/public/assets/setting.svg";
import Talk from "@/public/assets/talk.svg";
import TalkClicked from "@/public/assets/talk_clicked.svg";
import TalkSqaure from "@/public/assets/talk_square.svg";
import Thumb from "@/public/assets/thumb.svg";
import Write from "@/public/assets/write.svg";
import Location from "@/public/assets/location.svg";

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
  setting: Setting,
  notification_on: NotificationOn,
  notification_off: NotificationOff,
  arrow: Arrow,
  pen: Pen,
  thumb: Thumb,
  close: Close,
  back: Back,
  logo1: Logo1,
  logo2: Logo2,
  logo3: Logo3,
  write: Write,
  delete: Delete,
  sad: Sad,
  neutral: Neutral,
  happy: Happy,
  location: Location,
} as const;
export type IconName = keyof typeof iconTypes;

interface IIconProps {
  name: IconName;
  stroke?: string;
  strokeWidth?: string;
  fill?: string;
  width?: string;
  height?: string;
}
const Icon: FC<IIconProps> = ({ name, ...props }) => {
  let Icon: any = iconTypes[name];
  return <Icon {...props} css={{ cursor: "pointer" }} />;
};

export default Icon;
