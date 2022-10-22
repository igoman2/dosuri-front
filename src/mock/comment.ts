export const comment: Comment = {
  id: 1,
  replyList: [
    {
      id: 1,
      content: "후기 감사합니다 도움이 되었어요",
      registered: "12시간전",
      nickname: "아이고맨",
      comments: [],
    },
    {
      id: 2,
      content: "이런후기라면 추천이요",
      nickname: "홍명보",
      registered: "12시간전",
      comments: [
        {
          writer: "너굴맨",
          registered: "12시간전",
          content: "감사합니다.",
        },
        {
          writer: "홍명보",
          registered: "12시간전",
          content: "아니에요.",
        },
        {
          writer: "홍길동",
          registered: "12시간전",
          content: "안녕하세요~~~~.",
        },
      ],
    },
  ],
};

export interface Comment {
  id: number;
  replyList: Reply[];
}

interface Reply {
  id: number;
  nickname: string;
  content: string;
  registered: string;
  comments: replyComment[];
}

interface replyComment {
  writer: string;
  registered: string;
  content: string;
}
