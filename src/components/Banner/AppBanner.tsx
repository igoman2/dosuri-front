import styled from "@emotion/styled";
import { FC } from "react";
import PlaystoreIcon from "@/public/assets/playstore_icon.png";
import CloseIcon from "@/public/assets/white-close-button.png";
import Image from "next/image";

export interface AppBannerProp {
  onInstall: () => void;
  onClose: () => void;
}

const AppBanner: FC<AppBannerProp> = ({ onClose, onInstall }) => {
  return (
    <AppBannerWrapper>
      <div className="banner">
        <div className="banner-contents">
          <Image
            src={PlaystoreIcon}
            alt="playstoreIcon"
            width={40}
            height={40}
          />
          <div className="text text-content">
            도수리 앱에서 훨씬
            <br /> 편리하게 이용하기
          </div>
          <div className="install-button text" onClick={onInstall}>
            앱 설치
          </div>
        </div>
        <div className="close-button" onClick={onClose}>
          <Image src={CloseIcon} alt="closeIcon" width={10} height={10} />
        </div>
      </div>
    </AppBannerWrapper>
  );
};

export default AppBanner;

const AppBannerWrapper = styled.div`
  position: fixed;
  top: 0px;
  height: 8rem;
  width: 100%;
  max-width: 40rem;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 999;

  .banner {
    display: flex;
    height: 8rem;
    justify-content: space-between;

    .banner-contents {
      display: flex;
      align-items: center;
      width: 100%;
      padding-left: 2rem;
    }

    .text-content {
      width: 12.1rem;
      height: 4rem;
      margin-left: 1rem;
      flex-grow: 1;
    }

    .text {
      color: white;
      font-size: ${(props) => props.theme.fontSizes.md};
      line-height: ${(props) => props.theme.fontSizes.lg};
      font-weight: bold;
      display: flex;
      align-items: center;
    }

    .install-button {
      margin: 0 3rem;
      width: 8.8rem;
      height: 3.4rem;
      justify-content: center;
      border-radius: 0.3rem;
      background-color: ${(props) => props.theme.colors.purple};
      cursor: pointer;
    }

    .close-button {
      margin-top: 1.1rem;
      margin-right: 1.1rem;
      cursor: pointer;
    }
  }
`;
