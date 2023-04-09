import React, { FC, ReactElement, useContext } from "react";

import Button from "../../../Button";
import { CommentStore } from "@/store/context/Comment";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";

interface ICommentBoxProps {
  nickname: string;
  registerId: string;
  registered: string;
  content: string;
  id?: string;
  inner?: boolean;
  threadOwner?: string;
  children?: ReactElement;
}

const CommentBox: FC<ICommentBoxProps> = ({
  nickname,
  registerId,
  registered,
  content,
  children,
  id,
  threadOwner,
  inner,
}) => {
  const theme = useTheme();
  const value = useContext(CommentStore);
  const handleThreadReply = () => {
    value.setTo({ nickname, uuid: registerId });
    value.setIsThread(true);
    value.setThreadId(id!);
  };

  return (
    <CommentBoxWrapper>
      <div className="layout">
        <div className="comment-head">
          <div className="nickname">{nickname}</div>
          <div className="register-time">{registered}</div>
        </div>

        <div className="content">
          <div className={inner ? "inner" : ""}>
            {inner ? <div className="tagged">{`@${threadOwner}`}</div> : null}

            <div>{content}</div>
          </div>
        </div>
        <Button
          css={{
            display: "flex",
            padding: 0,
          }}
          onClick={handleThreadReply}
          text="답글달기"
          backgroundColor="white"
          fontSize="sm"
          color={theme.colors.grey}
        />
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

  .tagged {
    font-size: ${(props) => props.theme.fontSizes.lg};
    line-height: ${(props) => props.theme.lineHeights.lg};
    color: ${(props) => props.theme.colors.purple};
    margin-right: 0.4rem;
  }

  .inner {
    display: flex;
  }

  .content {
    font-size: ${(props) => props.theme.fontSizes.lg};
    line-height: ${(props) => props.theme.lineHeights.lg};
  }
`;
