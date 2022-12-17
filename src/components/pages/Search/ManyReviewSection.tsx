import HospitalCard from "@/components/Card/HospitalCard";
import { IHospitalInfo } from "@/mock/hospitals";
import Link from "next/link";
import React from "react";
import { getHospitalList } from "@/service/apis";
import { useQuery } from "react-query";
import { useTheme } from "@emotion/react";

const ManyReviewSection = () => {
  const theme = useTheme();

  const { data: getHospitalListData2 } = useQuery({
    queryKey: "getHospitalList-search-2",
    queryFn: async () => {
      const data = await getHospitalList({
        ordering: "-article_count",
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
        후기는 다다익선! 치료 후기 많은 곳
      </div>

      {getHospitalListData2?.map((hospital, i) => (
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
  );
};

export default ManyReviewSection;
