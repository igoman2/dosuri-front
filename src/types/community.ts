export type Comments = {
  uuid: string;
  user: User;
  up_count: number;
  view_count: number;
  content: string;
  article_thread: Thread[];
  created_at: string;
};

export type User = {
  uuid: string;
  nickname: string;
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
  path: string;
  created_at: string;
};
