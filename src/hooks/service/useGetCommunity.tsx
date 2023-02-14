import {
  IGetCommunityListParams,
  IHotCommunityResponse,
} from "@/service/types";

import { getCommunityList } from "@/service/apis/community";
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
        hospital_uuid: "",
        content: "",
        is_like: false,
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
  const { data: communityList } = useQuery(
    ["getCommunityListKeyword", params],
    () => getCommunityList(params),
    {
      staleTime: 0,
      cacheTime: 0,
    }
  );

  return { communityList: communityList ?? fallback };
}
