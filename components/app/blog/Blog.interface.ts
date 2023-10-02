import { Dispatch, SetStateAction } from "react";

export interface HeadTitleProps {
  displayName: string;
  date: Date;
  headTitle: string;
  setHeadTitle: Dispatch<SetStateAction<string>>;
}

export interface HeroImageProps {
  blogCoverImage: string;
  setBlogCoverImage: Dispatch<SetStateAction<string>>;
  blogCoverImageFile: File | null;
  setBlogCoverImageFile: Dispatch<SetStateAction<File | null>>;
  setVideoId: Dispatch<SetStateAction<string>>;
}
