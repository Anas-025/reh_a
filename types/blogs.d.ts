export interface MetaBlog {
  id: string;
  date: FirebaseTimestamp;
  displayName: string;
  headTitle: string;
  heroImageSrc: string;
  published: boolean;
  uid: string;
}

export interface Blog {
  blogData: BlogData[],       // blog content
  date: FirebaseTimestamp,    // date of blog
  displayName: string,        // blog author name
  headTitle: string,          // blog title
  heroImageSrc: string,       // blog cover image url
  id: string,                 // blogId
  uid: string                 // userId
}

export interface BlogData{
  title: string,      // main blog title
  content?: string,    // blog content
  src?: string        // blog image (may not contain additional image)
}

export interface BlogCreateData {
  title: string
  content?: string
  src?: File       // file is uploaded while creating blog
}

export interface BlogEditData {
  title: string
  content?: string
  src?: File | string // existing image url or new file
}

export interface FirebaseTimestamp {
  nanoseconds: number,
  seconds: number,
}