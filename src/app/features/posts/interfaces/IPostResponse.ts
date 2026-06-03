import { IPost } from "./IPost";

export interface IPostRespone {
  posts: IPost[];
  total: number;
  skip: number;
  limit: number;
}