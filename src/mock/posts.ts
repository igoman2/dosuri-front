export const posts: Post[] = [
  {
    id: 1,
    nickname: "해리케인",
    registered: "12시간전",
    hospitalName: "논현신사정형외과의원",
    images: [
      "https://dosuri-images.s3.ap-northeast-2.amazonaws.com/sampleImage2.png",
      "https://dosuri-images.s3.ap-northeast-2.amazonaws.com/sampleImage2.png",
      "https://dosuri-images.s3.ap-northeast-2.amazonaws.com/sampleImage2.png",
    ],
    review:
      "친절하고 좋아요! 도수 받았는데 시원하고 좋아요~~! 세줄까지만 표시하고 그 이상 넘어가면 더보기로 처리하기 길어지면 세줄처리 길어지면 세줄처리 길어지면 세줄처리",
    heart: 11,
    comment: 11,
  },
  {
    id: 2,
    nickname: "해리케인",
    registered: "12시간전",
    hospitalName: "논현신사정형외과의원",
    images: [
      "https://dosuri-images.s3.ap-northeast-2.amazonaws.com/sampleImage2.png",
      "https://dosuri-images.s3.ap-northeast-2.amazonaws.com/sampleImage2.png",
      "https://dosuri-images.s3.ap-northeast-2.amazonaws.com/sampleImage2.png",
    ],
    review:
      "친절하고 좋아요! 도수 받았는데 시원하고 좋아요~~! 세줄까지만 표시하고 그 이상 넘어가면 더보기로 처리하기 길어지면 세줄처리 길어지면 세줄처리 길어지면 세줄처리",
    heart: 11,
    comment: 11,
  },
  {
    id: 2,
    nickname: "해리케인",
    registered: "12시간전",
    hospitalName: "논현신사정형외과의원",
    images: [
      "https://dosuri-images.s3.ap-northeast-2.amazonaws.com/sampleImage2.png",
      "https://dosuri-images.s3.ap-northeast-2.amazonaws.com/sampleImage2.png",
      "https://dosuri-images.s3.ap-northeast-2.amazonaws.com/sampleImage2.png",
    ],
    review:
      "친절하고 좋아요! 도수 받았는데 시원하고 좋아요~~! 세줄까지만 표시하고 그 이상 넘어가면 더보기로 처리하기 길어지면 세줄처리 길어지면 세줄처리 길어지면 세줄처리",
    heart: 11,
    comment: 11,
  },
  {
    id: 2,
    nickname: "해리케인",
    registered: "12시간전",
    hospitalName: "논현신사정형외과의원",
    images: [
      "https://dosuri-images.s3.ap-northeast-2.amazonaws.com/sampleImage2.png",
      "https://dosuri-images.s3.ap-northeast-2.amazonaws.com/sampleImage2.png",
      "https://dosuri-images.s3.ap-northeast-2.amazonaws.com/sampleImage2.png",
    ],
    review:
      "친절하고 좋아요! 도수 받았는데 시원하고 좋아요~~! 세줄까지만 표시하고 그 이상 넘어가면 더보기로 처리하기 길어지면 세줄처리 길어지면 세줄처리 길어지면 세줄처리",
    heart: 11,
    comment: 11,
  },
];

export interface Post {
  id: number;
  nickname: string;
  registered: string;
  hospitalName: string;
  images: string[];
  review: string;
  heart: number;
  comment: number;
}
