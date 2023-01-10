import React, { ChangeEvent, FC, useContext, useState } from "react";

import Button from "../Button";
import { CommentStore } from "@/store/context/Comment";
import { KeyboardEvent } from "react";
import styled from "@emotion/styled";
import { useEffect } from "react";
import { useRef } from "react";
import { useRegisterComment } from "@/hooks/service/useRegisterComment";
import { useTheme } from "@emotion/react";

interface IReplyProps {
  postId: string;
}

const Reply: FC<IReplyProps> = ({ postId }) => {
  const theme = useTheme();
  const [content, setContent] = useState("");
  const value = useContext(CommentStore);
  const { mutate } = useRegisterComment(value.isThread);
  const inputRef = useRef<HTMLInputElement>(null);

  console.log(value);
  useEffect(() => {
    if (value.to.uuid) {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  }, [value.to]);

  const handleCommentInput = (e: ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
    value.setContent(e.target.value);
  };

  const handleCommentSubmit = () => {
    mutate(
      {
        content: value.content,
        article: value.isThread ? value.threadId : postId,
        mention_user: value.to.uuid,
      },
      {
        onSuccess: () => {
          setContent("");
          value.clearStore();
        },
      }
    );
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCommentSubmit();
    }
  };

  const placeholder = value.to.uuid ? "" : "댓글을 입력하세요.";

  return (
    <ReplyWrapper>
      <div className="reply-input">
        {value.to.uuid ? (
          <div className="tagged">{`@${value.to.nickname}`}</div>
        ) : null}

        <input
          type="text"
          id="reply"
          name="reply"
          required
          placeholder={placeholder}
          onChange={handleCommentInput}
          onKeyDown={handleKeyPress}
          value={content}
          ref={inputRef}
        />
        <Button
          text="등록"
          backgroundColor="white"
          color={theme.colors.purple}
          fontSize="md"
          onClick={handleCommentSubmit}
        />
      </div>
    </ReplyWrapper>
  );
};

export default Reply;

const ReplyWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 0 2rem;
  width: 100%;
  border-top: 1px solid rgba(51, 51, 51, 0.1);

  .tagged {
    font-size: ${(props) => props.theme.fontSizes.md};
    line-height: ${(props) => props.theme.lineHeights.md};
    color: ${(props) => props.theme.colors.purple};
  }

  .reply-input {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: ${(props) => props.theme.colors.white};
  }

  input {
    flex-grow: 1;
    font-size: ${(props) => props.theme.fontSizes.md};
    line-height: ${(props) => props.theme.lineHeights.md};
    border: none;

    ::placeholder {
      color: ${(props) => props.theme.colors.grey};
    }
    :focus {
      outline: none;
    }
  }
`;
