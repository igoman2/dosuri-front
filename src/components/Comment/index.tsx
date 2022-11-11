import { Comment } from "@/mock/comment";
import styled from "@emotion/styled";
import React, { FC } from "react";
import CommentBox from "./CommentBox";

interface ICommentProps {
  comment: Comment;
}

const Comment: FC<ICommentProps> = ({ comment }) => {
  return (
    <CommentCardWrapper>
      <>
        {comment.replyList.map((reply, i) => {
          return (
            <div key={i}>
              <CommentBox
                nickname={reply.nickname}
                registered={reply.registered}
                content={reply.content}
              >
                <div className="content">
                  {reply.comments.map((comment, i) => {
                    return (
                      <div className="reply-wrapper" key={i}>
                        <CommentBox
                          nickname={comment.writer}
                          registered={comment.registered}
                          content={comment.content}
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
