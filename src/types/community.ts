import { User } from "./user";

export type Comments = {
  uuid: string;
  user: User;
  up_count: number;
  view_count: number;
  content: string;
  article_thread: Thread[];
  created_at: string;
};

export type Thread = {
  uuid: string;
  user: User;
  up_count: number;
  view_count: number;
  content: string;
  created_at: string;
};

export type Attach = {
  uuid: string;
  attachment: {
    signed_path: string;
    created_at: string;
    uuid: string;
  };
  created_at: string;
};

export type ArticleThread = {
  uuid: string;
  user: User;
  up_count: number;
  view_count: number;
  content: string;
  created_at: string;
};

export type Treatment = {
  uuid: string;
  keyword: string;
  selected?: boolean;
};

export type Tab = {
  title: "전체" | "치료후기만 보기" | "질문/상담만 보기";
  value: "all" | "review" | "question";
};

export type TabItem = {
  title: string;
  value: string;
};
