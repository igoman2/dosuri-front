import {
  ICommunityPostDetailResponse,
  IHospitalReviewsResult,
} from "@/service/types";
import React, { FC } from "react";

import Icon from "@/util/Icon";
import { isListView } from "@/util/typeGuard";
import styled from "@emotion/styled";
import { useLikePost } from "@/hooks/service/useLikePost";
import { useTheme } from "@emotion/react";

interface IPostBottomProps {
  review: IHospitalReviewsResult | ICommunityPostDetailResponse;
  type: "list" | "detail";
}

const PostBottom: FC<IPostBottomProps> = ({ review, type }) => {
  const theme = useTheme();
  const { mutate } = useLikePost();
  const handleLike = () => {
    mutate(review.uuid);
  };

  return (
    <PostBottomWrapper>
      {type === "list" ? (
        <div className="post-bottom">
          <div className="heart">
            {review.is_like ? (
              <Icon
                name="heart"
                width="20"
                height="20"
                fill={theme.colors.red}
              />
            ) : (
              <Icon name="heart" width="20" height="20" />
            )}
            <span>{review.up_count}</span>
          </div>
          <div className="comment">
            <Icon name="comment" width="17" height="17" />
            <span>{isListView(review) && review.comment_count}</span>
          </div>
        </div>
      ) : (
        <div className="post-bottom">
          <div className="heart" onClick={handleLike}>
            {review.is_like ? (
              <Icon
                name="heart"
                width="20"
                height="20"
                fill={theme.colors.red}
              />
            ) : (
              <Icon name="heart" width="20" height="20" />
            )}

            <span>좋아요</span>
          </div>
        </div>
      )}
    </PostBottomWrapper>
  );
};

export default PostBottom;

const PostBottomWrapper = styled.div`
  .post-bottom {
    display: flex;
    gap: 1rem;
    font-size: ${(props) => props.theme.fontSizes.sm};
    line-height: ${(props) => props.theme.lineHeights.sm};
    .heart {
      display: flex;
      gap: 0.3rem;
      align-items: center;
    }
    .comment {
      display: flex;
      gap: 0.3rem;
      align-items: center;
    }
  }
`;
