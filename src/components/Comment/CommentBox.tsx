import React, { FC, ReactElement } from "react";

import styled from "@emotion/styled";

interface ICommentBoxProps {
  nickname: string;
  registered: string;
  content: string;
  children?: ReactElement;
}

const CommentBox: FC<ICommentBoxProps> = ({
  nickname,
  registered,
  content,
  children,
}) => {
  return (
    <CommentBoxWrapper>
      <div className="layout">
        <div className="comment-head">
          <div className="nickname">{nickname}</div>
          <div className="register-time">{registered}</div>
        </div>
        <div className="content">
          <div>{content}</div>
        </div>
        <div className="reply">답글달기</div>
      </div>

      {children}
    </CommentBoxWrapper>
  );
};

export default CommentBox;

const CommentBoxWrapper = styled.div`
  margin: 1.5rem 0;

  .layout {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
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

  .content {
    font-size: ${(props) => props.theme.fontSizes.lg};
    line-height: ${(props) => props.theme.lineHeights.lg};
  }

  .reply {
    font-size: ${(props) => props.theme.fontSizes.sm};
    line-height: ${(props) => props.theme.lineHeights.sm};
    color: ${(props) => props.theme.colors.grey};
  }
`;
