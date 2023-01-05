import { FC, ReactNode, createContext, useMemo, useState } from "react";

import { User } from "@/types/user";

interface ICommentProvider {
  children: ReactNode;
}

export const CommentStore = createContext({
  to: {
    nickname: "",
    uuid: "",
  },
  content: "",
  isThread: false,
  threadId: "",
  setTo: (to: User) => {},
  setContent: (content: string) => {},
  setIsThread: (val: boolean) => {},
  setThreadId: (id: string) => {},
  clearStore: () => {},
});

const CommentProvider: FC<ICommentProvider> = ({ children }) => {
  const [to, setTo] = useState<User>({ nickname: "", uuid: "" });
  const [content, setContent] = useState("");
  const [isThread, setIsThread] = useState(false);
  const [threadId, setThreadId] = useState("");
  const clearStore = () => {
    setTo({
      nickname: "",
      uuid: "",
    });
    setContent("");
    setIsThread(false);
    setThreadId("");
  };

  const value = useMemo(() => {
    return {
      to,
      setTo,
      content,
      threadId,
      setContent,
      isThread,
      setIsThread,
      setThreadId,
      clearStore,
    };
  }, [content, isThread, threadId, to]);

  return (
    <CommentStore.Provider value={value}>{children}</CommentStore.Provider>
  );
};

export default CommentProvider;
