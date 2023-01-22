import HospitalCard from "@/components/Card/HospitalCard";
import Link from "next/link";
import React from "react";
import { getFilteredHospitalList } from "@/service/apis/hospital";
import { useQuery } from "react-query";
import { useTheme } from "@emotion/react";

const LIST_COUNT_LIMIT = 3;

const NewReviewSection = () => {
  const theme = useTheme();
  const { data: getHospitalListData1 } = useQuery({
    queryKey: "getHospitalList-search-1",
    queryFn: async () => {
      const data = await getFilteredHospitalList({
        ordering: "-latest_article_created_at",
        page_size: LIST_COUNT_LIMIT,
      });
      return data.results;
    },
    retry: 0,
  });

  return (
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

      {getHospitalListData1?.map((hospital, i) => (
        <Link href={`hospital/${hospital.uuid}`} key={hospital.uuid}>
          <a>
            <HospitalCard hospitalInfo={hospital} />
          </a>
        </Link>
      ))}
    </div>
  );
};

export default NewReviewSection;
