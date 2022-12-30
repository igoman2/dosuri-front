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
    uuid: string;
  };
  created_at: string;
};
