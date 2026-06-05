import { IPost } from "../interfaces/IPost";

export type PostEditData = Pick<IPost, 'title' | 'tags' | 'views'>;