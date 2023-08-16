import { isMobile } from "react-device-detect";

const isApple = () => {
 const user = navigator.userAgent.toLowerCase();
   if (!isMobile) {
     if (
       user.indexOf("apple") > -1 ||
       user.indexOf("safari") > -1 ||
       user.indexOf("mac") > -1
     ) {
       return true;
     } else {
       return false;
     }
   } else {
     if (
       user.indexOf("iphone") > -1 ||
       user.indexOf("ipad") > -1 ||
       user.indexOf("ipod") > -1 ||
       user.indexOf("safari") > -1
     ) {
       return true;
     } else {
       return false;
     }
   }
};

export default isApple;