import HospitalCard from "@/components/Card/HospitalCard";
import Layout from "@/components/Layout";
import Header from "@/components/Layout/Header";
import Divider from "@/components/UI/Divider";
import ImageTextView from "@/components/UI/ImageTextView";
import { IHospitalInfoResponse, IHospitalInfo } from "@/mock/hospitals";
import { SELECT_LIST, ListItem } from "@/mock/searchCategory";
import { getHospitalImages, getHospitalList } from "@/service/apis";
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import Link from "next/link";
import { useState } from "react";
import { useQuery } from "react-query";
import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";
import ChevronDowm from "@/public/assets/chevron-down.png";
import Image from "next/image";

const Home = () => {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState(SELECT_LIST[0]);
  function onDismiss() {
    setOpen(false);
  }
  const theme = useTheme();
  const [hospitals1, setHospitals1] =
    useState<IHospitalInfoResponse | null>(null);
  const [hospitals2, setHospitals2] =
    useState<IHospitalInfoResponse | null>(null);
  const [hospitals3, setHospitals3] =
    useState<IHospitalInfoResponse | null>(null);

  const [hospitalsImages1, setHospitalsImages1] =
    useState<IHospitalInfoResponse | null>(null);
  const [hospitalsImages2, setHospitalsImages12] =
    useState<IHospitalInfoResponse | null>(null);
  const [hospitalsImages3, setHospitalsImages13] =
    useState<IHospitalInfoResponse | null>(null);

  const { isLoading: asd, data: qwe } = useQuery({
    queryKey: ["getHospitalList-image", category],
    queryFn: async () => {
      const data = await getHospitalImages();
      return data;
    },
    retry: 0,
    onSuccess: (res) => {
      setHospitals1(res);
    },
    onError: (err: any) => {
      setHospitals1(err.response.data);
    },
  });

  const { isLoading: getHispitalListIsLoading1, data: getHispitalListData1 } =
    useQuery({
      queryKey: ["getHospitalList-search-1", category],
      queryFn: async () => {
        const data = await getHospitalList({
          ordering: "-latest_article_created_at",
        });
        return data;
      },
      retry: 0,
      onSuccess: (res) => {
        setHospitals1(res);
      },
      onError: (err: any) => {
        setHospitals1(err.response.data);
      },
    });

  const { isLoading: getHispitalListIsLoading2, data: getHispitalListData2 } =
    useQuery({
      queryKey: ["getHospitalList-search-2", category],
      queryFn: async () => {
        const data = await getHospitalList({
          ordering: "-article_count",
        });
        return data;
      },
      retry: 0,
      onSuccess: (res) => {
        setHospitals2(res);
      },
      onError: (err: any) => {
        setHospitals2(err.response.data);
      },
    });

  const { isLoading: getHispitalListIsLoading3, data: getHispitalListData3 } =
    useQuery({
      queryKey: ["getHospitalList-search-3", category],
      queryFn: async () => {
        const data = await getHospitalList({
          ordering: "-view_count",
        });
        return data;
      },
      retry: 0,
      onSuccess: (res) => {
        setHospitals3(res);
      },
      onError: (err: any) => {
        setHospitals3(err.response.data);
      },
    });

  const onListClick = (item: ListItem) => {
    setCategory(item);
    onDismiss();
  };

  if (
    getHispitalListIsLoading1 ||
    getHispitalListIsLoading2 ||
    getHispitalListIsLoading3
  ) {
    return <h1>Loading</h1>;
  }

  return (
    <Layout header={<Header left={true} center={true} right={true} />}>
      <div
        css={{
          marginBottom: "2.5rem",
        }}
      >
        <div
          css={{
            fontSize: theme.fontSizes.xl,
            fontWeight: 700,
          }}
        >
          따끈한 후기가 새로 등록됐어요!
        </div>

        {hospitals1?.results.map((hospital: IHospitalInfo, i) => (
          <Link href={`hospital/${hospital.uuid}`} key={hospital.uuid}>
            <a>
              <HospitalCard hospitalInfo={hospital} />
            </a>
          </Link>
        ))}
      </div>
      <div
        css={{
          marginBottom: "2.5rem",
        }}
      >
        <div
          css={{
            fontSize: theme.fontSizes.xl,
            fontWeight: 700,
          }}
        >
          후기는 다다익선! 치료 후기 많은 곳
        </div>

        {hospitals2?.results.map((hospital: IHospitalInfo, i) => (
          <Link
            href={{
              pathname: `hospital/${hospital.uuid}`,
              query: hospital.uuid,
            }}
            key={hospital.uuid}
          >
            <a>
              <HospitalCard hospitalInfo={hospital} />
            </a>
          </Link>
        ))}
      </div>
      <div
        css={{
          marginBottom: "2.5rem",
        }}
      >
        <div
          css={{
            fontSize: theme.fontSizes.xl,
            fontWeight: 700,
          }}
        >
          모든 병원 보기
        </div>

        <ImageTextViewWrapper onClick={() => setOpen(!open)}>
          <ImageTextView
            text={category.title}
            border
            image={
              <Image
                src={ChevronDowm}
                height={12}
                width={12}
                alt="chevron-down"
              />
            }
          />
        </ImageTextViewWrapper>

        {hospitals3?.results.map((hospital: IHospitalInfo, i) => (
          <HospitalCard hospitalInfo={hospital} key={i} />
        ))}
      </div>

      <BottomSheet
        open={open}
        onDismiss={onDismiss}
        snapPoints={({ minHeight }) => [minHeight + 65]}
      >
        {SELECT_LIST.map((item, i) => {
          {
            return (
              <SelectList key={i} onClick={() => onListClick(item)}>
                <span className="list-title">{item.title}</span>
                <Divider height={1} />
              </SelectList>
            );
          }
        })}
      </BottomSheet>
    </Layout>
  );
};

export default Home;

const ImageTextViewWrapper = styled.div`
  margin-top: 0.5rem;
  margin-bottom: 1rem;
`;

const SelectList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 2rem;

  .list-title {
    padding: 1rem 0;
    font-size: ${(props) => props.theme.fontSizes.xxl};
    line-height: ${(props) => props.theme.lineHeights.xxl};
  }
`;
