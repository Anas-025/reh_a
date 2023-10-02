export interface FirebaseTimestamp {
  nanoseconds: number,
  seconds: number,
}

export interface HeadTitleProps {
  displayName: string,
  headTitle: string,
  date: FirebaseTimestamp
}

export interface BlogData{
  title: string,
  content: string
}

export interface Data {
  blogData: BlogData[],
  date: FirebaseTimestamp,
  displayName: string,
  headTitle: string,
  heroImageSrc: string,
  id: string,
  uid: string
  heroVideoId: string
}