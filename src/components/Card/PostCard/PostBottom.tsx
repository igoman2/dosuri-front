import React, { FC } from "react";

import Icon from "@/util/Icon";
import { Post } from "@/mock/posts";
import styled from "@emotion/styled";

interface IPostBottomProps {
  post: Post;
}

const PostBottom: FC<IPostBottomProps> = ({ post }) => {
  return (
    <PostBottomWrapper>
      <div className="post-bottom">
        <div className="heart">
          <Icon name="heart" width="17" height="17" />
          <span>{post.heart}</span>
        </div>
        <div className="comment">
          <Icon name="comment" />
          <span>{post.comment}</span>
        </div>
      </div>
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
