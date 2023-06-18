import React, { FC, Suspense, useEffect, useState } from "react";
import {
  getHospitalInfo,
  getHospitalTreatments,
  toggleHospitalThumbup,
} from "@/service/apis/hospital";
import Image from "next/image";
import Checkbox from "@/components/Checkbox/Checkbox";
import { useMutation, useQuery } from "react-query";
import { BottomSheet } from "react-spring-bottom-sheet";
import Button from "@/components/Button";
import DoSwiper from "@/components/DoSwiper";
import Doctors from "@/components/domain/Hospital/Doctors";
import HeaderDepth from "@/components/Layout/Header/HeaderDepth";
import Icon from "@/util/Icon";
import Information from "@/components/domain/Hospital/Information";
import Layout from "@/components/Layout";
import Link from "next/link";
import { NextPageContext } from "next";
import { NextSeo } from "next-seo";
import Price from "@/components/domain/Hospital/Price";
import Reviews from "@/components/domain/Hospital/Reviews";
import Spinner from "@/components/Spinner/Spinner";
import Tab from "@/components/Tab";
import { queryClient } from "@/service/react-query/queryClient";
import { queryKeys } from "@/service/react-query/constants";
import styled from "@emotion/styled";
import theme from "@/styles/theme";
import { useRouter } from "next/router";
import ImageTextView from "@/components/CustomImage/ImageTextView";
import useAuth from "@/hooks/useAuth";
import formIcon from "@/public/assets/form_icon.png";
import { FormikProvider, useFormik } from "formik";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { reservationModalState } from "@/components/domain/Hospital/store";
import ReservationModal from "@/components/domain/Hospital/ReservationModal";
import { changePersonalInfoConsent, getUser } from "@/service/apis/user";
import { userInfoState } from "@/store/user";

interface TabItem {
  title: string;
  value: string;
}

interface IHospitalInformationProps {
  id: string;
  tab: string;
}

const TabList: TabItem[] = [
  {
    title: "병원정보",
    value: "information",
  },
  {
    title: "의료진",
    value: "doctors",
  },
  {
    title: "치료후기",
    value: "reviews",
  },
  {
    title: "비용정보",
    value: "price",
  },
];

const PROTECTED_TABS = ["price"];

const HospitalInformation: FC<IHospitalInformationProps> = ({ id, tab }) => {
  const [currentTab, setCurrentTab] = useState<TabItem>(
    TabList.find((t) => t.value === tab) ?? TabList[0]
  );
  const [isUp, setIsUp] = useState<boolean>();
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useRecoilState(reservationModalState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [consents, setConsents] = useState([
    {
      checked: false,
      text: "전체 동의",
    },
    {
      checked: false,
      text: "개인정보 수집이용 동의 (필수)",
    },
    {
      checked: false,
      text: "개인정보 제3자 제공 동의 (필수)",
    },
    {
      checked: false,
      text: "민감정보 수집 이용 동의 (필수)",
    },
    {
      checked: false,
      text: "마케팅 목적 개인정보 수집이용 동의 (선택)",
    },
    {
      checked: false,
      text: "마케팅 정보 수신 (선택)",
    },
    {
      checked: false,
      text: "앱 Push",
    },
    {
      checked: false,
      text: "이메일",
    },
    {
      checked: false,
      text: "SMS",
    },
  ]);

  useEffect(() => {
    router.replace({
      pathname: `/hospital/${id}`,
      query: { tab: currentTab.value },
    });
  }, [currentTab]);

  function onDismiss() {
    setOpen(false);
  }

  const checkTabIsProtected = (tab: TabItem) => {
    return PROTECTED_TABS.includes(tab.value);
  };

  const onTabClickHander = (tab: TabItem) => {
    if (checkTabIsProtected(tab) && !isLoggedIn) {
      router.push("/login");
      return;
    }
    setCurrentTab(tab);
    router.replace({
      pathname: `/hospital/${router.query.id}`,
      query: { tab: tab.value },
    });
  };

  // 단순 정보 조회라서 useQuery를 사용하였지만 서버 내부적으로는 해당 병원에 대한 조회수를 올리는 POST api로 개발되어있기 때문에 POST 요청이 캐시되는 것을 방지하기 위해 cacheTime을 0으로 설정
  const { data: hospitalInfoData } = useQuery({
    queryKey: ["getHospitalInfo"],
    queryFn: async () => {
      const data = await getHospitalInfo(id);
      return data;
    },
    cacheTime: 0,
    retry: 0,
  });

  const uuid = hospitalInfoData?.uuid;

  const formik = useFormik({
    initialValues: {
      consents: [],
    },
    onSubmit: () => {
      setModal(true);
    },
  });

  const { data: hospitalTreatmentsData } = useQuery({
    queryKey: ["hospital-treatments", uuid],
    queryFn: async () => {
      const resp = await getHospitalTreatments(uuid!);
      return resp;
    },

    enabled: !!uuid,
  });

  useEffect(() => {
    if (hospitalInfoData) {
      setIsUp(hospitalInfoData.is_up);
    }
  }, [hospitalInfoData]);

  const mutate = useMutation({
    mutationFn: () => {
      return toggleHospitalThumbup({
        hospital: uuid,
        is_up: !isUp,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.hospital],
        refetchInactive: true,
      });
    },
  });

  if (!hospitalInfoData || !hospitalTreatmentsData) {
    return <div>bug</div>;
  }

  const onThumbUp = () => {
    mutate.mutate();
    setIsUp((prev) => !prev);
  };

  const imageSource = hospitalInfoData.attachments.map(
    (image) => image.signed_path
  );

  const handleAgreeAll = () => {
    setConsents((prev) => {
      const tmp = [...prev];
      const isAgreeAll = prev[0].checked;
      tmp.forEach((consent) => (consent.checked = !isAgreeAll));
      return tmp;
    });
  };

  const setAgreeAll = (consents: any) => {
    let agreeAll = true;
    for (let i = 1; i < 6; i++) {
      agreeAll = agreeAll && consents[i].checked;
    }

    return agreeAll;
  };

  const consentHandler = async () => {
    const personalInfoConsentParams = {
      agree_marketing_personal_info: consents[4].checked,
      agree_general_push: true,
      agree_marketing_push: consents[5].checked,
      agree_marketing_email: consents[7].checked,
      agree_marketing_sms: consents[8].checked,
      uuid: userInfo.uuid,
    };

    try {
      const response = await changePersonalInfoConsent(
        personalInfoConsentParams
      );
      const resp = await getUser();
      const user = resp!;
      setUserInfo((prev) => {
        return {
          ...prev,
          setting: user.setting,
        };
      });
      setOpen(false);
      formik.handleSubmit();
    } catch (e) {
      console.log(e);
    }
  };

  const canSubmit = () => {
    return consents[1].checked && consents[2].checked && consents[3].checked;
  };

  const handleReservationClick = () => {
    setOpen(true);
  };

  return (
    <>
      <Layout header={<HeaderDepth />} footer={false}>
        <NextSeo
          title={`${hospitalInfoData.name} 도수치료 비용 후기 | 도수리-도수치료 리얼후기`}
          canonical={`https://www.dosuri.site/hospital/${hospitalInfoData.uuid}`}
          openGraph={{
            url: `https://www.dosuri.site/hospital/${hospitalInfoData.uuid}`,
          }}
        />

        <Hospital>
          <div className="swiper-layout">
            {imageSource.length === 0 ? (
              <div
                css={{
                  width: "100%",
                  height: "21.2rem",
                  backgroundColor: theme.colors.grey,
                }}
              ></div>
            ) : (
              <SwiperWrapper>
                <DoSwiper source={imageSource} slidesPerView={1} />
              </SwiperWrapper>
            )}
          </div>

          <div className="hospital-content">
            <div className="head">
              <div className="hospital-name">{hospitalInfoData.name}</div>
              <div onClick={onThumbUp}>
                <ImageTextView
                  text={"추천"}
                  color={isUp ? theme.colors.green : theme.colors.grey}
                  image={
                    <Icon
                      name="thumb"
                      fill={isUp ? theme.colors.green : theme.colors.grey}
                    />
                  }
                  reverse
                />
              </div>
            </div>
            <div className="tab-wrapper">
              <Tab
                tabList={TabList}
                currentTab={currentTab}
                onTabClickHander={onTabClickHander}
              />
            </div>
            <Suspense fallback={<Spinner />}>
              {currentTab.value === "information" && (
                <Information hospitalData={hospitalInfoData} />
              )}
              {currentTab.value === "doctors" && (
                <Doctors hospitalData={hospitalInfoData} />
              )}
              {currentTab.value === "reviews" && (
                <Reviews hospitalData={hospitalInfoData} />
              )}
              {currentTab.value === "price" && (
                <Price
                  hospitalData={hospitalInfoData}
                  hospitalTreatmentsData={hospitalTreatmentsData}
                />
              )}
            </Suspense>
          </div>
          <div className={open || modal ? "disable" : ""}>
            <SaleButtonWrapper>
              {hospitalInfoData.is_partner ? (
                <Button
                  text="도수리에서 예약하고 3,000원 적립받기"
                  width="100%"
                  height="5.2rem"
                  borderRadius="0.3rem"
                  backgroundColor={theme.colors.purple_light}
                  bold
                  onClick={handleReservationClick}
                ></Button>
              ) : (
                <Link href="/insurance-register">
                  <a>
                    <Button
                      text="도수리에서 최대 70% 싸게 도수치료 받기"
                      width="100%"
                      height="5.2rem"
                      borderRadius="0.3rem"
                      backgroundColor={theme.colors.purple_light}
                      bold
                    />
                  </a>
                </Link>
              )}
            </SaleButtonWrapper>
          </div>
        </Hospital>
      </Layout>
      {open && (
        <BottomSheet
          open={open}
          onDismiss={onDismiss}
          // snapPoints={({ minHeight }) => [minHeight + 65]}
        >
          <DosuriReservation>
            <div className="form-title">
              <div>예약을 원하시면 동의가 필요해요</div>
              <Image
                src={formIcon}
                alt="formIcon"
                width={41}
                height={41}
              ></Image>
            </div>
            <FormikProvider value={formik}>
              <form>
                <CheckboxWrapper>
                  <div className="agree-all">
                    <Checkbox
                      text={consents[0].text}
                      value={consents[0].checked}
                      onClick={handleAgreeAll}
                    />
                  </div>
                  <div className="agree">
                    <Checkbox
                      text={consents[1].text}
                      value={consents[1].checked}
                      onClick={() => {
                        setConsents((prev) => {
                          const tmp = [...prev];
                          tmp[1].checked = !prev[1].checked;
                          tmp[0].checked = setAgreeAll(tmp);
                          return tmp;
                        });
                      }}
                    />
                    <Link href="https://dosuri.notion.site/a424b489456a4ee9af5f6067e2cc6718">
                      <a>자세히</a>
                    </Link>
                  </div>
                  <div className="agree">
                    <Checkbox
                      text={consents[2].text}
                      value={consents[2].checked}
                      onClick={() => {
                        setConsents((prev) => {
                          const tmp = [...prev];
                          tmp[2].checked = !prev[2].checked;
                          tmp[0].checked = setAgreeAll(tmp);
                          return tmp;
                        });
                      }}
                    />
                    <Link href="https://dosuri.notion.site/3-e502521051ea4b8481e0c0bfd0f67f6b">
                      <a>자세히</a>
                    </Link>
                  </div>
                  <div className="agree">
                    <Checkbox
                      text={consents[3].text}
                      value={consents[3].checked}
                      onClick={() => {
                        setConsents((prev) => {
                          const tmp = [...prev];
                          tmp[3].checked = !prev[3].checked;
                          tmp[0].checked = setAgreeAll(tmp);
                          return tmp;
                        });
                      }}
                    />
                    <Link href="https://dosuri.notion.site/591f0834abb54961a0fab1c24667a351">
                      <a>자세히</a>
                    </Link>
                  </div>
                  <div className="agree">
                    <Checkbox
                      text={consents[4].text}
                      value={consents[4].checked}
                      onClick={() => {
                        setConsents((prev) => {
                          const tmp = [...prev];
                          tmp[4].checked = !prev[4].checked;
                          tmp[0].checked = setAgreeAll(tmp);
                          return tmp;
                        });
                      }}
                    />
                    <Link href="https://dosuri.notion.site/8c696da9c8a94c45bf9893ca213a8d2e">
                      <a>자세히</a>
                    </Link>
                  </div>

                  <Checkbox
                    text={consents[5].text}
                    value={consents[5].checked}
                    onClick={() => {
                      setConsents((prev) => {
                        const tmp = [...prev];
                        const agreeMarketing = prev[5].checked;
                        tmp[5].checked = !agreeMarketing;
                        tmp[6].checked = !agreeMarketing;
                        tmp[7].checked = !agreeMarketing;
                        tmp[8].checked = !agreeMarketing;
                        tmp[0].checked = setAgreeAll(tmp);
                        return tmp;
                      });
                    }}
                  />
                  <div className="agree-sub">
                    <Checkbox
                      text={consents[6].text}
                      value={consents[6].checked}
                      onClick={() => {
                        setConsents((prev) => {
                          const tmp = [...prev];
                          tmp[6].checked = !prev[6].checked;
                          if (
                            !tmp[6].checked &&
                            !prev[7].checked &&
                            !prev[8].checked
                          ) {
                            tmp[5].checked = false;
                          } else {
                            if (!tmp[5].checked) tmp[5].checked = true;
                          }
                          tmp[0].checked = setAgreeAll(tmp);
                          return tmp;
                        });
                      }}
                    />
                    <Checkbox
                      text={consents[7].text}
                      value={consents[7].checked}
                      onClick={() => {
                        setConsents((prev) => {
                          const tmp = [...prev];
                          tmp[7].checked = !prev[7].checked;
                          if (
                            !prev[6].checked &&
                            !tmp[7].checked &&
                            !prev[8].checked
                          ) {
                            tmp[5].checked = false;
                          } else {
                            if (!tmp[5].checked) tmp[5].checked = true;
                          }
                          tmp[0].checked = setAgreeAll(tmp);
                          return tmp;
                        });
                      }}
                    />
                    <Checkbox
                      text={consents[8].text}
                      value={consents[8].checked}
                      onClick={() => {
                        setConsents((prev) => {
                          const tmp = [...prev];
                          tmp[8].checked = !prev[8].checked;
                          if (
                            !prev[6].checked &&
                            !prev[7].checked &&
                            !tmp[8].checked
                          ) {
                            tmp[5].checked = false;
                          } else {
                            if (!tmp[5].checked) tmp[5].checked = true;
                          }
                          tmp[0].checked = setAgreeAll(tmp);
                          return tmp;
                        });
                      }}
                    />
                  </div>
                </CheckboxWrapper>
              </form>
            </FormikProvider>
            <Button
              text="동의하고 신청하기"
              width="100%"
              height="5.2rem"
              borderRadius="0.3rem"
              backgroundColor={theme.colors.purple_light}
              bold
              onClick={consentHandler}
              disabled={!canSubmit()}
            />
          </DosuriReservation>
        </BottomSheet>
      )}
      <ReservationModal hospitalUuid={hospitalInfoData.uuid} />
    </>
  );
};

export default HospitalInformation;

const DosuriReservation = styled.div`
  margin: 1rem;
  .form-title {
    display: flex;
    align-items: center;
    gap: 2rem;
    font-size: ${(props) => props.theme.fontSizes.lg};
    line-height: ${(props) => props.theme.lineHeights.lg};
    font-weight: bold;
    margin-bottom: 2rem;
  }
`;

const CheckboxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;

  .agree-all {
    margin-bottom: 2rem;
  }

  .agree {
    display: flex;
    justify-content: space-between;
    a {
      align-items: center;
      font-size: ${(props) => props.theme.fontSizes.md};
      line-height: ${(props) => props.theme.lineHeights.md};
      color: ${(props) => props.theme.colors.grey};
    }
  }

  .agree-sub {
    display: flex;
    gap: 2.1rem;
    margin-left: 4rem;
    margin-bottom: 2rem;
  }
`;

const Hospital = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: -6rem;
  margin: auto;

  .hospital-content {
    padding: 0 2rem;
    margin-bottom: 8.7rem;
    overflow-x: hidden;
  }

  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 2rem;
    margin-bottom: 2.5rem;

    & .hospital-name {
      font-size: ${(props) => props.theme.fontSizes.xl};
      line-height: ${(props) => props.theme.lineHeights.xl};
      font-weight: 700;
    }
  }

  .tab-wrapper {
    margin-bottom: 2.5rem;
  }

  .disable {
    display: none;
  }
`;

const SaleButtonWrapper = styled.div`
  position: fixed;
  bottom: 0;
  margin: 0 2rem;
  width: calc(100% - 4rem);
  max-width: 40rem;
  margin: 0 auto;
  left: 0;
  right: 0;
  padding: 1rem 0;
  background-color: ${(props) => props.theme.colors.white};
  z-index: 100;
`;

const SwiperWrapper = styled.div`
  div {
    position: relative;
    width: 100%;
    height: 21.2rem;
    background-color: white;
  }
`;

export const getServerSideProps = async (context: NextPageContext) => {
  const { query } = context;
  const { id, tab } = query;
  return {
    props: {
      id,
      tab: tab ?? "price",
    },
  };
};
