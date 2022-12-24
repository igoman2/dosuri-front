import React, { FC } from "react";

import CommentBox from "./CommentBox";
import { Comments } from "@/types/community";
import styled from "@emotion/styled";
import { Comment as type } from "@/mock/comment";

interface ICommentProps {
  comments: Comments[];
}

const Comment: FC<ICommentProps> = ({ comments }) => {
  return (
    <CommentCardWrapper>
      <>
        {comments.map((comment, i) => {
          return (
            <div key={i}>
              <CommentBox
                nickname={comment.user.nickname}
                registered={comment.created_at}
                content={comment.content}
              >
                <div className="content">
                  {comment.article_thread.map((thread, i) => {
                    return (
                      <div className="reply-wrapper" key={i}>
                        <CommentBox
                          nickname={thread.user.nickname}
                          registered={thread.created_at}
                          content={thread.content}
                        />
                      </div>
                    );
                  })}
                </div>
              </CommentBox>
            </div>
          );
        })}
      </>
    </CommentCardWrapper>
  );
};

export default Comment;

const CommentCardWrapper = styled.div`
  margin: 1rem 0;

  .reply-wrapper {
    margin-left: 1rem;
  }

  .comment-head {
    display: flex;
    gap: 1rem;

    .nickname {
      font-size: ${(props) => props.theme.fontSizes.md};
      line-height: ${(props) => props.theme.lineHeights.md};
      font-weight: 700;
    }

    .register-time {
      margin: auto 0;
      color: ${(props) => props.theme.colors.grey};
      font-size: ${(props) => props.theme.fontSizes.sm};
      line-height: ${(props) => props.theme.lineHeights.sm};
    }
  }
`;
