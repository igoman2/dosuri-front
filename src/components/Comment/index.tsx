import React, { FC } from "react";

import CommentBox from "./CommentBox";
import { Comments } from "@/types/community";
import styled from "@emotion/styled";

interface ICommentProps {
  comments: Comments[];
}

const Comment: FC<ICommentProps> = ({ comments }) => {
  return (
    <CommentCardWrapper>
      <>
        {comments.reverse().map((comment) => {
          return (
            <div key={comment.uuid}>
              <CommentBox
                nickname={comment.user.nickname}
                registered={comment.created_at}
                content={comment.content}
                id={comment.uuid}
              >
                <div className="content">
                  {comment.article_thread.reverse().map((thread, i) => {
                    return (
                      <div className="reply-wrapper" key={thread.uuid}>
                        <CommentBox
                          threadOwner={comment.user.nickname}
                          nickname={thread.user.nickname}
                          registered={thread.created_at}
                          content={thread.content}
                          id={comment.uuid}
                          inner={true}
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
  margin: 1rem 0 5rem 0;

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
