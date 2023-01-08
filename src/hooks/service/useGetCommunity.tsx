import {
  IGetCommunityListParams,
  IHotCommunityResponse,
} from "@/service/types";

import { getCommunityList } from "@/service/apis/community";
import { queryKeys } from "@/service/react-query/constants";
import { useQuery } from "react-query";

export function useGetCommunity(params?: IGetCommunityListParams) {
  const fallback: IHotCommunityResponse = {
    count: 0,
    next: "",
    previous: "",
    results: [
      {
        uuid: "",
        user: {
          uuid: "",
          nickname: "",
        },
        comment_count: 0,
        article_type: "",
        up_count: 0,
        view_count: 0,
        created_at: "",
        hospital: "",
        content: "",
        article_attachment_assoc: [
          {
            uuid: "",
            attachment: {
              uuid: "",
              created_at: "",
              signed_path: "",
            },
            created_at: "",
          },
        ],
      },
    ],
  };
  const { data: communityList } = useQuery([queryKeys.user], () =>
    getCommunityList(params)
  );

  return { communityList: communityList ?? fallback };
}
