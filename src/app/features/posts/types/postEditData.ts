import { IPost } from "../interfaces/IPost";

export type postEditData = Pick<IPost, 'title' | 'tags' | 'views'>;