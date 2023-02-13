export interface Comment {
  id: number;
  comment:string;
  dateOfComment: Date;
  author:string;
}

export interface Blog {
  id: number;
  title: string;
  author: string;
  thumbnail: string;
  description: string;
  category: string;
  creationDate: Date;
  comments: Comment[];
  ratings: number[];
}

export interface UserCredential {
  username: string;
  password: string;
}